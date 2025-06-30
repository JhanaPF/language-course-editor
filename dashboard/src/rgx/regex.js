export const validEmail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/

/**
 * @description
 *       Au moins une lettre majuscule, (?=.*?[A-Z])
 *       Au moins une lettre minuscule, (?=.*?[a-z])
 *       Au moins un chiffre, (?=.*?[0-9])
 *       Au moins un caractère spécial, (?=.*?[#?!@$%^&*-])
 *       8 caractères minimum .{8,} (avec les ancrages)
*/
export const validPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

export const validString = /[abcdefghijklmnopqrstuvwxyzAZERTYUIOPQSDFGHJKLMWXCVBNéèàôöùáéíóúýÁÉÍÓÚÝ,;:!?./%&]/

