const effectPreviewsElement = document.querySelectorAll('.effects__preview');
const uploadFileInputElement = document.querySelector('#upload-file');
const imagePreviewElement = document.querySelector('.img-upload__preview img');

uploadFileInputElement.addEventListener('change', () => {
  const file = uploadFileInputElement.files[0];
  if (file) {
    const fileUrl = URL.createObjectURL(file);
    imagePreviewElement.src = fileUrl;
    effectPreviewsElement.forEach((preview) => {
      preview.style.backgroundImage = `url(${fileUrl})`;
    });
  }
});
