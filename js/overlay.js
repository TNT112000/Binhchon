"use strict";function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,r){if(e){if("string"==typeof e)return _arrayLikeToArray(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?_arrayLikeToArray(e,r):void 0}}function _iterableToArray(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _arrayLikeToArray(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function _defineProperty(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var PMCRedirectOverlay=function e(){var t=this;_classCallCheck(this,e),_defineProperty(this,"setup_hooks",function(){t.$(".pmc-reg-rd-overlay-banner .btn-close").on("click",t.hide_banner),t.$(".pmc-reg-rd-overlay-banner").on("click","a",t.expire_session)}),_defineProperty(this,"hide_banner",function(e){e.preventDefault(),t.$(e.target).parent().hide()}),_defineProperty(this,"expire_session",function(){pmc.cookie.expire(t.short_term_cookie_name)}),_defineProperty(this,"should_display_banner",function(){var e=pmc.cookie.get(t.long_term_cookie_name),r=pmc.is_empty(e),e=pmc.cookie.get(t.short_term_cookie_name);return r=!pmc.is_empty(e)||r}),_defineProperty(this,"set_cookies",function(){var e=pmc.cookie.get(t.long_term_cookie_name);pmc.is_empty(e)&&(e=30,"undefined"!=typeof pmc_region_redirect_overlay&&void 0!==pmc_region_redirect_overlay.dnd_duration&&0<parseInt(pmc_region_redirect_overlay.dnd_duration)&&(e=parseInt(pmc_region_redirect_overlay.dnd_duration)),e*=86400,pmc.cookie.set(t.long_term_cookie_name,"hide",e,"/","strictly-necessary"),pmc.cookie.set(t.short_term_cookie_name,"show",0,"","strictly-necessary"))}),_defineProperty(this,"get_current_country",function(){return("undefined"!=typeof pmc_fastly_geo_data&&void 0!==pmc_fastly_geo_data.country?pmc_fastly_geo_data.country:"").toLowerCase()}),_defineProperty(this,"get_current_language",function(){return"undefined"!=typeof navigator&&void 0!==navigator.language?navigator.language.split("-")[0]:""}),_defineProperty(this,"has_local_site",function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"";return void 0!==e&&!pmc.is_empty(e)&&[].concat(_toConsumableArray(pmc_region_redirect_overlay.countries),_toConsumableArray(pmc_region_redirect_overlay.languages)).includes(e)}),_defineProperty(this,"maybe_display_banner",function(){var e,r="language"===pmc_region_redirect_overlay.redirect_type?t.get_current_language():t.get_current_country();t.should_display_banner()&&t.has_local_site(r)&&(e=pmc_region_redirect_overlay.overlay_html[r],(r=t.$("#pmc-reg-rd-overlay-banner")).find(".message").html(e),r.show(),t.set_cookies())}),this.$=jQuery,this.long_term_cookie_name="pmc_reg_rd_overlay_banner",this.short_term_cookie_name="pmc_reg_rd_overlay_banner_sesn",this.setup_hooks(),this.maybe_display_banner()};new PMCRedirectOverlay;