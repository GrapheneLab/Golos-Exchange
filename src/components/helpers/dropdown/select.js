import React from "react";
import {Dropdown} from "./dropdown";
import {clsx, useClassSetter} from "../../../utils";
import {CaretIcon} from "../../../svg";
import {BodyBold} from "../global";
import {fieldHook} from "../form/hooks";

const SelectBtn = ({btnLabel, btnContent, toggleOpenState}) => {
    const [baseClass, setClass] = useClassSetter("select-btn");
    return(
        <button className={clsx(baseClass, btnContent && "active")} onClick={toggleOpenState}>
            { btnContent }
            { btnLabel && <BodyBold className={setClass("label")} content={`selects.${btnLabel}`} /> }
            <div className={setClass("caret")}>
                <CaretIcon />
            </div>
        </button>
    )
};

export const Select = ({id, label, list, className, ...props}) => {
    let { name, value: selectedId, disabled, onChange } = fieldHook(props);

    const btnLabel = label || name;

    const handleChange = (id) => () => {
        onChange({name, value: id});
    };

    const selectedItem = list[selectedId];
    const btnContent = selectedItem && <BodyBold content={selectedItem.content} text={selectedItem.text} />;

    return(
        <Dropdown
            btnContent={btnContent}
            btnLabel={btnLabel}
            btnComponent={SelectBtn}
            dropdownList={list.map((({content, text}, id) => (
                <div key={id} onClick={handleChange(id)}>
                    <BodyBold content={content} text={text} />
                </div>
            )))}
            disabled={disabled}
        />
    )
};