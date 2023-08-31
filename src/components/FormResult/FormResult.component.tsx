import { FC, useMemo } from 'react';
import { FormFields } from '../FormConfig';
import styles from './FormResult.module.sass';

interface Props {
  form: FormFields;
}

export const FormResult: FC<Props> = ({ form }) => {
  const formFields = useMemo(() => {
    if (!form.items) return [];

    return form.items.filter((item) => item.type !== 'button');
  }, [form]);

  const formButtons = useMemo(() => {
    if (!form.items) return [];

    const buttonItems = form?.items.filter((item) => item.type === 'button');
    if (buttonItems.length >= 0) return buttonItems;

    return [];
  }, [form]);

  return (
    <div className={styles.formWrapper}>
      <div className={styles.title}>
        <h3>{form.title}</h3>
      </div>

      <div className={styles.fieldsWrapper}>
        {formFields.map(({ id, label, type, placeholder }) => (
          <label key={id}>
            <span className={styles.labelText}>{label}</span>

            {type === 'multitext' ? (
              <textarea
                id={`input-${id}`}
                rows={5}
                cols={30}
                placeholder={placeholder}
              />
            ) : (
              <input id={`input-${id}`} type={type} placeholder={placeholder} />
            )}
          </label>
        ))}
      </div>

      <div className={styles.footer}>
        {!!formButtons &&
          formButtons.map(({ id, text }) => <button key={id}>{text}</button>)}
      </div>
    </div>
  );
};
