import imgArray from './gallery-items.js';

let index;

const refs = {
    gallery: document.querySelector('.js-gallery'),
    modal: document.querySelector('.js-lightbox'),
    originalImg: document.querySelector('.lightbox__image'),
}

refs.gallery.addEventListener('click', onGalleryClick);
refs.modal.addEventListener('click', onModalClick);
window.addEventListener('keydown', onModalKeypress);

const createImg = item => {
    const listItem = document.createElement('li');
    listItem.classList.add('gallery__item');

    const link = document.createElement('a');
    link.classList.add('gallery__link');
    link.setAttribute('href', item.original);

    const img = document.createElement('img');
    img.classList.add('gallery__image', 'js-gallery__image');
    img.setAttribute('src', item.preview);
    img.setAttribute('alt', item.description);

    link.appendChild(img);
    listItem.appendChild(link);

    return listItem;
}
const createGallegy = currentArray => currentArray.map(item => createImg(item));

function onGalleryClick(event) {
    event.preventDefault();

    const imgRef = event.target;
    const linkRef = imgRef.parentNode;
    const itemRef = linkRef.parentNode;



    if (imgRef.nodeName !== 'IMG') {
        return;
    }

    refs.modal.classList.add('is-open');
    refs.originalImg.src = linkRef;

    whatIndex(imgRef.src);
}
function onModalClick(event) {
    const imgRef = event.target;

    if (imgRef.nodeName !== 'IMG') {
        refs.modal.classList.remove('is-open');
        refs.originalImg.removeAttribute('src');
    }

}
function onModalKeypress(event) {
    if (event.code === 'Escape') {
        refs.modal.classList.remove('is-open');
        refs.originalImg.removeAttribute('src');
    }

    if (event.code === 'ArrowRight' && (index + 1) < imgArray.length) {
        refs.originalImg.removeAttribute('src');
        refs.originalImg.src = imgArray[index += 1].original;
    }
    if (event.code === 'ArrowLeft' && index > 0) {
        refs.originalImg.removeAttribute('src');
        refs.originalImg.src = imgArray[index -= 1].original;
    }
}

function whatIndex(currentItem) {
    index = imgArray.map(elem => elem.preview).indexOf(currentItem);
}

refs.gallery.append(...createGallegy(imgArray));