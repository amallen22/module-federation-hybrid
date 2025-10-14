'use strict';

/** UGLY HACK FOR IE11 COMPATIBILITY
 * window.opener.dispatchEvent() simply does not work in IE11. Why? Cos fuck you, that's why.
 * window.opener in IE11 is so broken that it does not recognize ACTUAL EVENTS (standard, custom or otherwise) to be
 * passed with dispatchEvent(), which is otherwise well supported, but not on a window's opener reference, maybe because
 * Jupiter wasn't aligned with the unholy Feng Shui of the calamitous darkness ritual when Satan's asshole birthed
 * the lament of humanity that is Internet Explorer.
 * So, instead of being able to send Events in between windows with nice parameters like a sane person,
 * one must invoke a function attached to the callee window outside of React lifecycle, in hacky 1990's-era non-OOP
 * ShitScript™ and all the while polluting global namespace. Hey, at least it's short and sweet. (Kill me).
 * If there was another way, I wouldn't have spent 2 days on this. Blame @chris.
 * Also see LinkedInLogin.js if you want to vomit some more.
 * */

window.opener.CV.linkedInLogin(window.location.search);
window.close();
