import { useState } from "react";
import { Switch } from "@chakra-ui/react";

export default function Subject({ setSubjectCallback, subject, setSubjectUsed, maxScore = 100 }) {
    const [inputValue, setInputValue] = useState(0);
    const [checked, setChecked] = useState(true);

    // 切換開關
    const onToggle = (e) => {
        setChecked(e.checked);
        setSubjectUsed((prev) => {
            return { ...prev, [subject]: e.checked };
        });
    };

    // 處理輸入變更
    const onInputChange = (e) => {
        const val = e.target.value;
        if (!/^\d*(\.\d+)?$/.test(val)) return; // 只允許數字輸入
        console.log(Number(val))
        const numVal = Math.min(maxScore, Math.max(0, parseFloat(val))); // 限制範圍 0-100
        setInputValue(numVal);  // Set as a number

        // 更新分數，避免重複項目
        setSubjectCallback((prev) => {
            return { ...prev, [subject]: numVal };
        });
    };

    return (
        <div className="subject-container">
            <Switch.Root checked={checked} onCheckedChange={onToggle}>
                <Switch.HiddenInput />
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
                <Switch.Label />
            </Switch.Root>
            <h1>{subject}</h1>
            <input
                type="number"
                className="score-input"
                onChange={onInputChange}
                value={inputValue.toString()} // Make sure to convert the number to a string for rendering
                disabled={!checked}
            />
        </div>
    );
}