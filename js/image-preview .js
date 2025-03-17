const effectPreviews = document.querySelectorAll('.effects__preview');
const uploadFileInput = document.querySelector('#upload-file');
const imagePreview = document.querySelector('.img-upload__preview img');

uploadFileInput.addEventListener('change', () => {
  const file = uploadFileInput.files[0];
  if (file) {
    const fileUrl = URL.createObjectURL(file);
    imagePreview.src = fileUrl;
    effectPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${fileUrl})`;
    });
  }
});
