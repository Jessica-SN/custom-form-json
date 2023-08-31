import { FC, useCallback, useState } from 'react';
import { exampleFormString } from '../../App';
import styles from './FormConfig.module.sass';

export type FieldType =
  | 'number'
  | 'button'
  | 'text'
  | 'multitext'
  | 'checkbox'
  | 'date'
  | 'radio';

export type FieldItem = {
  id: string;
  placeholder?: string;
  label?: string;
  text?: string;
  type: FieldType;
};

export type FormFields = {
  title?: string;
  items?: FieldItem[];
};

export interface Props {
  onApply(form: FormFields): void;
}

export const FormConfig: FC<Props> = ({ onApply }) => {
  const [configValue, setConfigValue] = useState<string>(exampleFormString);

  const handleChangeConfigValue = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setConfigValue(e.target.value);
  };

  const handleApplyConfig = useCallback(() => {
    try {
      // configValue needs conversion to JSON
      JSON.parse(configValue);
      return onApply(JSON.parse(configValue) as FormFields);
    } catch (e) {
      console.error('Error!', e);
      // configValue is already a JSON
      return onApply((configValue as unknown) as FormFields);
    }
  }, [configValue, onApply]);

  return (
    <div className={styles.formConfigWrapper}>
      <label>
        Create the form of your dreams:
        <textarea
          rows={20}
          value={configValue}
          className={styles.configInput}
          onChange={handleChangeConfigValue}
        />
      </label>

      <button className={styles.applyButton} onClick={handleApplyConfig}>
        Apply
      </button>
    </div>
  );
};
