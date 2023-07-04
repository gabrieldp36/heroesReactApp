export const selectImg = (heroe) => {
  if(heroe) {
    if(heroe.alt_img) {
      return heroe.alt_img;
    } else if(heroe?.assets_img) {
      return `/assets/heroes/${ heroe.id }.jpg`;
    } else {  
      return '/assets/no-image.png'
    };
  };
};

export const selectPerfil = (usuario) => {
  if(usuario) {
    if(usuario.url_foto) {
      return usuario.url_foto;
    } else {  
      return '/assets/UserPlaceHolder.jpg'
    };
  };
};