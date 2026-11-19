#!/usr/bin/env bash
# API smoke test: signs up throwaway users and walks the whole hiring flow
# (profile, job, PDF/DOC/DOCX applications, resume download, status, password, delete).
#
# It WRITES to whatever database the API uses. Point the API at a disposable
# database (for example a Neon branch), never production:
#   DATABASE_URL=<test branch url> bun run dev
#   SMOKE_CONFIRM_TEST_DB=yes bun run test:smoke
# Test users use the @test.dev domain and are deleted at the end.
set -u
API="${API_URL:-http://localhost:5001/api/v1}"
if [ "${SMOKE_CONFIRM_TEST_DB:-}" != "yes" ]; then
  echo "Refusing to run: set SMOKE_CONFIRM_TEST_DB=yes after pointing the API at a test database." >&2
  exit 2
fi
F=$(mktemp -d)
trap 'rm -rf "$F"' EXIT
python3 - "$F" <<'PY'
import os, sys, zipfile
d = sys.argv[1]
open(f"{d}/resume.pdf", "wb").write(b"%PDF-1.4\n1 0 obj<</Type/Catalog>>endobj\ntrailer<</Root 1 0 R>>\n%%EOF\n")
with zipfile.ZipFile(f"{d}/resume.docx", "w") as z:
    z.writestr("[Content_Types].xml", "<Types/>"); z.writestr("word/document.xml", "<w:document/>")
open(f"{d}/resume.doc", "wb").write(bytes([0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1]) + b"\0" * 504)
open(f"{d}/fake.pdf", "wb").write(b"just text pretending")
open(f"{d}/notes.txt", "wb").write(b"hello")
open(f"{d}/big.pdf", "wb").write(b"%PDF" + os.urandom(6 * 1024 * 1024))
PY
T=$(date +%s)
EMP=$(mktemp); CAN=$(mktemp); CAN2=$(mktemp)
pass=0; fail=0
check() { # name expected actual body
  if [ "$2" = "$3" ]; then pass=$((pass+1)); echo "PASS $1 ($3)"; else fail=$((fail+1)); echo "FAIL $1 expected $2 got $3 :: ${4:0:200}"; fi
}
req() { # jar method path [curl args...] -> sets CODE BODY
  local jar=$1 m=$2 p=$3; shift 3
  local out; out=$(curl -s -w '\n%{http_code}' -b "$jar" -c "$jar" -X "$m" "$API$p" "$@")
  CODE=${out##*$'\n'}; BODY=${out%$'\n'*}
}
J=(-H 'Content-Type: application/json')

req $EMP GET /health; check health 200 $CODE "$BODY"
req $EMP POST /auth/signup "${J[@]}" -d '{"name":"E","email":"bad","password":"Testpass123"}'; check signup-bad-email 400 $CODE "$BODY"
req $EMP POST /auth/signup "${J[@]}" -d "{\"name\":\"E\",\"email\":\"e$T@test.dev\",\"password\":\"short\"}"; check signup-short-pw 400 $CODE "$BODY"
req $EMP POST /auth/signup "${J[@]}" -d "{\"name\":\"Emp $T\",\"email\":\"emp$T@test.dev\",\"password\":\"Testpass123\",\"role\":\"employer\"}"; check signup-employer 201 $CODE "$BODY"
echo "$BODY" | grep -q '"token"' && check no-token-in-body absent present "$BODY" || check no-token-in-body absent absent ""
req $EMP POST /auth/signup "${J[@]}" -d "{\"name\":\"Emp\",\"email\":\"emp$T@test.dev\",\"password\":\"Testpass123\"}"; check signup-duplicate 400 $CODE "$BODY"
req $EMP GET /auth/me; check me-employer 200 $CODE "$BODY"
req $EMP GET /employer/profile; check profile-empty 200 $CODE "$BODY"
echo "$BODY" | grep -q '"employerProfile":null' && check profile-null yes yes "" || check profile-null yes no "$BODY"

JOB='{"title":"QA Engineer","workplaceType":"remote","jobType":"full_time","minSalary":10,"maxSalary":20,"currency":"INR","experienceLevel":"junior","description":"Test job","requirements":["a"],"responsibilities":["b"],"skills":["Testing"],"applicationDeadline":"2099-01-01"}'
req $EMP POST /jobs "${J[@]}" -d "$JOB"; check create-job-no-profile 400 $CODE "$BODY"
req $EMP PUT /employer/profile "${J[@]}" -d '{"companyName":"Acme","headquartersLocation":"Pune","website":"ftp://x"}'; check profile-bad-url 400 $CODE "$BODY"
req $EMP PUT /employer/profile "${J[@]}" -d '{"companyName":"","headquartersLocation":"Pune"}'; check profile-missing-name 400 $CODE "$BODY"
req $EMP PUT /employer/profile "${J[@]}" -d '{"companyName":"Acme QA","headquartersLocation":"Pune","industry":"Software","website":"https://acme.test","contactEmail":"hr@acme.test"}'; check profile-create 200 $CODE "$BODY"
req $EMP PUT /employer/profile "${J[@]}" -d '{"companyName":"Acme QA Ltd","headquartersLocation":"Pune"}'; check profile-update 200 $CODE "$BODY"
req $EMP POST /jobs "${J[@]}" -d "${JOB/remote/moon}"; check create-job-bad-enum 400 $CODE "$BODY"
req $EMP POST /jobs "${J[@]}" -d "$JOB"; check create-job 201 $CODE "$BODY"
JOB_ID=$(echo "$BODY" | python3 -c 'import sys,json;print(json.load(sys.stdin)["job"]["id"])')
echo "$BODY" | grep -q '"companyName":"Acme QA Ltd"' && check job-uses-profile yes yes "" || check job-uses-profile yes no "$BODY"
req $EMP GET /jobs; check list-jobs 200 $CODE ""
req $EMP GET /jobs/$JOB_ID; check job-detail 200 $CODE "$BODY"
req $EMP GET /jobs/abc; check job-detail-bad-id 400 $CODE "$BODY"
req $EMP GET /jobs/99999999; check job-detail-404 404 $CODE "$BODY"

req $CAN POST /auth/signup "${J[@]}" -d "{\"name\":\"Cand $T\",\"email\":\"cand$T@test.dev\",\"password\":\"Testpass123\"}"; check signup-candidate 201 $CODE "$BODY"
req $CAN POST /jobs "${J[@]}" -d "$JOB"; check candidate-cannot-post 403 $CODE "$BODY"
req $CAN GET /employer/dashboard; check candidate-no-employer 403 $CODE "$BODY"
req $EMP POST /jobs/$JOB_ID/apply -F coverLetter=hi -F resumeFile=@$F/resume.pdf; check employer-cannot-apply 403 $CODE "$BODY"
req /dev/null POST /jobs/$JOB_ID/apply -F coverLetter=hi -F resumeFile=@$F/resume.pdf; check apply-unauth 401 $CODE "$BODY"
req $CAN POST /jobs/$JOB_ID/apply -F coverLetter=hi -F "resumeFile=@$F/notes.txt;type=text/plain"; check apply-txt 400 $CODE "$BODY"
req $CAN POST /jobs/$JOB_ID/apply -F coverLetter=hi -F "resumeFile=@$F/fake.pdf;type=application/pdf"; check apply-fake-pdf 400 $CODE "$BODY"
req $CAN POST /jobs/$JOB_ID/apply -F coverLetter=hi -F "resumeFile=@$F/big.pdf;type=application/pdf"; check apply-too-big 400 $CODE "$BODY"
req $CAN POST /jobs/$JOB_ID/apply -F "resumeFile=@$F/resume.pdf;type=application/pdf"; check apply-no-cover 400 $CODE "$BODY"
req $CAN POST /jobs/$JOB_ID/apply -F coverLetter=hi; check apply-no-file 400 $CODE "$BODY"
req $CAN POST /jobs/$JOB_ID/apply -F "coverLetter=Hello there" -F "resumeFile=@$F/resume.pdf;type=application/pdf"; check apply-pdf 201 $CODE "$BODY"
echo "$BODY" | grep -q 'resumeFile"' && check no-bytes-in-response absent present "$BODY" || check no-bytes-in-response absent absent ""
req $CAN POST /jobs/$JOB_ID/apply -F "coverLetter=again" -F "resumeFile=@$F/resume.pdf;type=application/pdf"; check apply-duplicate 409 $CODE "$BODY"

req $CAN2 POST /auth/signup "${J[@]}" -d "{\"name\":\"Cand2 $T\",\"email\":\"cand2$T@test.dev\",\"password\":\"Testpass123\"}"; check signup-candidate2 201 $CODE ""
req $CAN2 POST /jobs/$JOB_ID/apply -F "coverLetter=Docx one" -F "resumeFile=@$F/resume.docx;type=application/vnd.openxmlformats-officedocument.wordprocessingml.document"; check apply-docx 201 $CODE "$BODY"

CAN3=$(mktemp)
req $CAN3 POST /auth/signup "${J[@]}" -d "{\"name\":\"Cand3 $T\",\"email\":\"cand3$T@test.dev\",\"password\":\"Testpass123\"}"; check signup-candidate3 201 $CODE ""
req $CAN3 POST /jobs/$JOB_ID/apply -F "coverLetter=Doc one" -F "resumeFile=@$F/resume.doc;type=application/msword"; check apply-doc 201 $CODE "$BODY"
req $EMP GET /employer/jobs/$JOB_ID/applications; check list-applications 200 $CODE "$BODY"
APPS="$BODY"
python3 - "$APPS" <<'PY'
import sys,json
d=json.loads(sys.argv[1]); print("  applications:",[(a["applicantName"],a["resumeFileName"],a["hasResume"],a["status"]) for a in d["applications"]])
PY
APP_IDS=$(echo "$APPS" | python3 -c 'import sys,json;print(" ".join(str(a["id"]) for a in json.load(sys.stdin)["applications"]))')
for id in $APP_IDS; do
  out=$(curl -s -b $EMP -D - -o $F/dl-$id "$API/employer/applications/$id/resume")
  CODE=$(echo "$out" | head -1 | awk '{print $2}'); check "resume-download-$id" 200 "$CODE" ""
  echo "  $(echo "$out" | grep -i -E '^content-(type|disposition)' | tr -d '\r' | tr '\n' ' ')"
done
cmp -s $F/resume.pdf $F/dl-$(echo $APP_IDS | awk '{print $3}') && check pdf-bytes-identical yes yes "" || check pdf-bytes-identical yes no ""
cmp -s $F/resume.docx $F/dl-$(echo $APP_IDS | awk '{print $2}') && cmp -s $F/resume.doc $F/dl-$(echo $APP_IDS | awk '{print $1}') && check doc-docx-bytes-identical yes yes "" || check doc-docx-bytes-identical yes no ""
FIRST=$(echo $APP_IDS | awk '{print $1}')
req $CAN GET /employer/applications/$FIRST/resume; check candidate-cannot-read-resume 403 $CODE "$BODY"
req $CAN2 GET /employer/applications/$FIRST/resume; check other-cannot-read-resume 403 $CODE "$BODY"
req $EMP PATCH /employer/applications/$FIRST/status "${J[@]}" -d '{"status":"hired"}'; check status-invalid 400 $CODE "$BODY"
req $EMP PATCH /employer/applications/$FIRST/status "${J[@]}" -d '{"status":"accepted"}'; check status-accept 200 $CODE "$BODY"
req $EMP GET /employer/dashboard; check dashboard 200 $CODE "$BODY"
echo "  $(echo "$BODY" | python3 -c 'import sys,json;print(json.load(sys.stdin)["dashboardStats"])')"
req $EMP GET /employer/my-jobs; check my-jobs 200 $CODE ""
req $CAN GET /jobs/$JOB_ID; echo "  peopleApplied=$(echo "$BODY" | python3 -c 'import sys,json;print(json.load(sys.stdin)["job"]["peopleApplied"])')"

req $CAN2 PATCH /auth/password "${J[@]}" -d '{"currentPassword":"wrong","newPassword":"Newpass1234"}'; check pw-wrong-current 400 $CODE "$BODY"
req $CAN2 PATCH /auth/password "${J[@]}" -d '{"currentPassword":"Testpass123","newPassword":"Newpass1234"}'; check pw-change 200 $CODE "$BODY"
req $CAN2 POST /auth/logout; check logout 200 $CODE ""
req $CAN2 GET /auth/me; check me-after-logout 401 $CODE ""
req $CAN2 POST /auth/login "${J[@]}" -d "{\"email\":\"cand2$T@test.dev\",\"password\":\"Testpass123\"}"; check login-old-pw 401 $CODE ""
req $CAN2 POST /auth/login "${J[@]}" -d "{\"email\":\"CAND2$T@test.dev\",\"password\":\"Newpass1234\"}"; check login-new-pw 200 $CODE "$BODY"
req $CAN2 DELETE /auth/me; check delete-account 200 $CODE "$BODY"
req $CAN2 GET /auth/me; check me-after-delete 401 $CODE ""
req $EMP GET /employer/jobs/$JOB_ID/applications; echo "  apps after candidate delete: $(echo "$BODY" | python3 -c 'import sys,json;print(json.load(sys.stdin)["count"])')"
req $EMP DELETE /employer/jobs/$JOB_ID; check delete-job 200 $CODE "$BODY"
req $EMP DELETE /employer/jobs/$JOB_ID; check delete-job-again 404 $CODE "$BODY"
for jar in $CAN $CAN3 $EMP; do req $jar DELETE /auth/me; check cleanup-delete 200 $CODE ""; done
echo "RESULT pass=$pass fail=$fail"
