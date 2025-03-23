import { useState } from "react";
import { Switch } from "@chakra-ui/react";

export default function Subject({ setSubjectCallback, subject, setSubjectUsed }) {
    const [inputValue, setInputValue] = useState(0);
    const [checked, setChecked] = useState(true);

    // 切換開關
    const onToggle = (e) => {
        setChecked(e.checked);
        setSubjectUsed((prev) => {
            return {...prev,  [subject]: e.checked };
        });
    };

    // 處理輸入變更
    const onInputChange = (e) => {
        const val = e.target.value;
        if (!/^\d*$/.test(val)) return; // 只允許數字輸入
        const numVal = Math.min(100, Math.max(0, Number(val))); // 限制範圍 0-100
        setInputValue(numVal);

        // 更新分數，避免重複項目
        setSubjectCallback((prev) => {
            return {...prev,  [subject]: numVal };
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
                value={inputValue}
                disabled={!checked}
            />
        </div>
    );
}
