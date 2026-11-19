"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { slideInItem, staggerContainer } from "@/animations";

const TOPICS = [
  { value: "assistant-helpful", label: "Helpful Response" },
  { value: "assistant-not-helpful", label: "Needs Improvement" },
  { value: "job-info", label: "Job Info" },
  { value: "ui-ux", label: "UI/UX" },
  { value: "other", label: "Other" },
];

const RATINGS = [
  { value: "excellent", label: "⭐⭐⭐⭐⭐ Excellent" },
  { value: "good", label: "⭐⭐⭐⭐ Good" },
  { value: "average", label: "⭐⭐⭐ Average" },
  { value: "poor", label: "⭐⭐ Poor" },
  { value: "very-poor", label: "⭐ Very Poor" },
];

const MAX_MESSAGE_LENGTH = 500;

interface FeedbackFormProps {
  selectedTopic: string;
  setSelectedTopic: (value: string) => void;
  selectedRating: string;
  setSelectedRating: (value: string) => void;
  feedbackMessage: string;
  setFeedbackMessage: (value: string) => void;
  isSubmitting: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

const FeedbackForm = (props: FeedbackFormProps) => {
  const selects = [
    { id: "feedback-topic", label: "Topic", options: TOPICS, value: props.selectedTopic, onChange: props.setSelectedTopic },
    { id: "feedback-rating", label: "Overall Rating", options: RATINGS, value: props.selectedRating, onChange: props.setSelectedRating },
  ];

  return (
    <motion.div className="feedback-form space-y-6 pt-2" initial="hidden" animate="visible" variants={staggerContainer}>
      <h2 className="text-xl font-semibold text-center">Share Your Feedback</h2>

      <motion.div className="grid grid-cols-2 gap-4" variants={slideInItem}>
        {selects.map((select) => (
          <div key={select.id} className="flex flex-col gap-2">
            <label htmlFor={select.id} className="text-sm font-medium text-foreground">
              {select.label}
            </label>
            <Select value={select.value} onValueChange={select.onChange}>
              <SelectTrigger id={select.id} className="w-full">
                <SelectValue placeholder={`Select ${select.label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {select.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </motion.div>

      <motion.div className="flex flex-col gap-2" variants={slideInItem}>
        <label htmlFor="feedback-message" className="text-sm font-medium text-foreground">
          Your Feedback
        </label>
        <textarea
          id="feedback-message"
          value={props.feedbackMessage}
          onChange={(event) => props.setFeedbackMessage(event.target.value)}
          placeholder="Tell us what you think... (optional but appreciated)"
          className="w-full px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent resize-none"
          rows={4}
          maxLength={MAX_MESSAGE_LENGTH}
          aria-describedby="feedback-char-count"
        />
        <p id="feedback-char-count" className="text-xs text-muted-foreground">
          {props.feedbackMessage.length}/{MAX_MESSAGE_LENGTH} characters
        </p>
      </motion.div>

      <motion.div className="flex gap-3" variants={slideInItem}>
        <Button variant="outline" onClick={props.onCancel} className="flex-1" disabled={props.isSubmitting}>
          Cancel
        </Button>
        <Button onClick={props.onSubmit} disabled={props.isSubmitting} className="flex-1">
          {props.isSubmitting ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              Sending...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default FeedbackForm;
