import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CommentEditor from "../src/components/CommentEditor";

test("CommentEditor component", () => {
  render(<CommentEditor send={true} />);
  expect(screen.getByText("send")).toBeInTheDocument();
});

test("submits a comment when send button is clicked", () => {
  const handleCommentSubmit = jest.fn();
  render(<CommentEditor send={true} />);
  expect(handleCommentSubmit).toHaveBeenCalledTimes(0);
  const submitButton = screen.getByText("send");
  fireEvent.click(submitButton);
  expect(handleCommentSubmit).toHaveBeenCalledTimes(1);
});
