import { useState } from "react";
import { Switch } from "@chakra-ui/react";
function isPotentialPlainNumber(str) {
  const trimmed = str.trim();
  return /^[-+]?(\d+\.?\d*|\.\d*)?$/.test(trimmed);
}

export default function Subject({
  setSubjectCallback,
  subject,
  setSubjectUsed,
}) {
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
    if (val === "") {
      setInputValue("");
      setSubjectCallback((prev) => {
        return { ...prev, [subject]: 0 };
      });
      return;
    }
    if (!isPotentialPlainNumber(val)) return;
    const numVal = parseFloat(val); // 限制範圍 0-100
    if (numVal >= 100) {
      setInputValue("100");
      setSubjectCallback((prev) => {
        return { ...prev, [subject]: 100 };
      });
    } else if (numVal <= 0) {
      setInputValue("0");
      setSubjectCallback((prev) => {
        return { ...prev, [subject]: 0 };
      });
    } else {
      setInputValue(val.replace(/^0+(?!$)/, "")); // Set as a number
      setSubjectCallback((prev) => {
        return { ...prev, [subject]: numVal };
      });
    }

    // 更新分數，避免重複項目
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
        type="text"
        className="score-input"
        onChange={onInputChange}
        value={inputValue.toString()} // Make sure to convert the number to a string for rendering
        disabled={!checked}
      />
    </div>
  );
}
