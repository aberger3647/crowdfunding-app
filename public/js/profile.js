const projectFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#project-name').value.trim();
  const description = document.querySelector('#project-description').value.trim();
  const needed_funding = document.querySelector('#project-funding').value.trim();

  if (name && description && needed_funding) {
    const response = await fetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify({ name, description, needed_funding }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project.');
    }
  }
};

document
  .querySelector('.project-form')
  .addEventListener('submit', projectFormHandler);
