import React, { useState } from "react";
import OptionButton from "@Components/History/optionbutton";
import ResolveQuestionForm from "./resolveQuestionForm";
import QuestionSection from "./questionSection";

enum OptionSelection {
    AddQuestion = 0,
    ResolveQuestion = 1,
}

const Dashboard = () => {
    const [option, setOption] = useState(OptionSelection.AddQuestion);

    return (
        <div className="flex text-primary-100 p-4 flex-col overflow-hidden gap-4">
            <h1 className="text-[1.625rem] font-medium leading-8 text-primary-100">
                Dashboard
            </h1>
            <OptionButton
                styleParent="w-[13.125rem] text-sm leading-4 bg-primary-card-200 dark:bg-gray-300 h-10  text-primary-100 mb-8"
                styleButton=" font-medium text-sm leading-4 rounded-md h-full"
                styleSelected="bg-footer-text text-primary-100"
                labels={["Create", "Resolve"]}
                selected={option}
                onChange={type => setOption(type)}
            />
            {OptionSelection[option] === OptionSelection[0] ? (
                <QuestionSection />
            ) : (
                <ResolveQuestionForm />
            )}
        </div>
    );
};

export default Dashboard;
