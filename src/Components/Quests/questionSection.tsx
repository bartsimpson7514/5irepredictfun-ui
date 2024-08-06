import React from "react";
import AddMultipleQuestionForm from "./addMultipleQuestionForm";

const QuestionSection = () => {
    return (
        <div className="flex text-primary-100 flex-col overflow-hidden gap-4">
            <AddMultipleQuestionForm />
        </div>
    );
};

export default QuestionSection;
