import { useState } from 'react';
import { EmptyForm } from './components/EmptyForm';
import { FormConfig, FormFields } from './components/FormConfig';
import { FormResult } from './components/FormResult';
import { Tabs } from './components/Tabs';
import { uniqueId } from 'lodash';
import './styles.sass';

export const exampleFormString = `{
  "title": "myForm",
  "items": [
    {
      "type": "text",
      "label": "Text input"
    },
    {
      "type": "checkbox",
      "label": "Checkbox"
    },
    {
      "type": "number",
      "label": "Number input"
    },
    {
      "type": "date",
      "label": "Date input"
    },
    {
      "type": "radio",
      "label": "Radio"
    },
    {
      "type": "multitext",
      "label": "Textarea input",
      "placeholder": "Enter your super long text"
    },
    {
      "type": "button",
      "text": "Cancel"
    },
    {
      "type": "button",
      "text": "Click me!"
    }
  ]
}`;

const _generateItemId = () => uniqueId('field-');

export default function App() {
  const [currentForm, setCurrentForm] = useState<FormFields>(
    JSON.parse(exampleFormString)
  );

  const onApplyChanges = (form: FormFields) => {
    if (!!form.items) {
      const validFormItem = form.items.map((item) => ({
        ...item,
        id: item.id = _generateItemId()
      }));
      form.items = validFormItem;
    }

    setCurrentForm(form);
  };

  return (
    <div className="App">
      <h2>Custom Form</h2>

      <Tabs
        items={[
          {
            id: 'tab1',
            isActive: true,
            title: 'Config',
            children: <FormConfig onApply={onApplyChanges} />
          },
          {
            id: 'tab2',
            isActive: false,
            title: 'Result',
            children:
              !!currentForm && !!currentForm.items ? (
                <FormResult form={currentForm} />
              ) : (
                <EmptyForm />
              )
          }
        ]}
      />
    </div>
  );
}
