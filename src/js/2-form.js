const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

const formData = {
  email: '',
  message: '',
};

// restore state
const savedFormData =
  JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

Object.keys(savedFormData).forEach(key => {
  formData[key] = savedFormData[key];
  form.elements[key].value = savedFormData[key];
});

form.addEventListener('input', onFormFieldInput);
form.addEventListener('submit', onFormSubmit);

function onFormFieldInput(event) {
  const { name, value } = event.target;

  formData[name] = value; // без trim тут

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();

  const values = Object.values(formData);

  if (values.some(v => !v.trim())) {
    alert('Please fill in all fields.');
    return;
  }

  const cleanedData = {
    email: formData.email.trim(),
    message: formData.message.trim(),
  };

  console.log('Form submitted:', cleanedData);

  localStorage.removeItem(STORAGE_KEY);

  formData.email = '';
  formData.message = '';

  form.reset();
}