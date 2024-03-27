/**
 * To minify this file:
 * $ npm install uglify-js -g
 * $ uglifyjs pmc-consent.js -cm -o pmc-consent.min.js
 */

window.pmc_consent = {
	/**
	 * Provide a mapped list of consent categories for cookies.
	 *
	 * @description Cookie Categories:
	 * 1. Strictly necessary (C0001): Essential for functionality (e.g. shopping cart).
	 * 2. Performance (C0002): Tracks website usage (e.g. Google Analytics).
	 * 3. Functional (C0003): Enhances user experience (e.g. language selector).
	 * 4. Targeting (C0004): Personalizes marketing (e.g. remarketing).
	 * 5. Social media (C0005): Facilitates content sharing on social networks.
	 */
	_consentGroupMappings: {
		'strictly-necessary': 'C0001',
		'performance': 'C0002',
		'functional': 'C0003',
		'targeting': 'C0004',
		'social': 'C0005',
	},

	/**
	 * From a given cookie name, use a simple algo to determine a default category
	 * name. Used when a category name is not provided during pmc.cookie.set().
	 *
	 * @todo Remove this behvaior when all uses of pmc.cookie.set() pass category param.
	 *
	 * @param {string} cookie_name The name of the cookie for which we need a category.
	 * @returns ?string String name of cookie category, or null if unavailable.
	 */
	_getDefaultConsentCategoryForCookieName: function( cookie_name = '' ) {
		// Functional cookies include those related to fonts, age gate and geo-based redirect.
		const functionalCookieKeys = [
			'age-validate',
			'fonts_loaded',
			'intl-overlay',
			'rr_uk_user_notification',
		];

		// Check for presence of above strings within the provided cookie name.
		const isFunctionalCookie = functionalCookieKeys.some( (substring) => {
			return -1 !== cookie_name.indexOf( substring );
		} );

		// Set default category for functional cookies.
		if ( isFunctionalCookie ) {
			return 'functional';
		}

		// Set default category for targeting cookies.
		if ( cookie_name.includes( 'getemails' ) ) {
			return 'targeting';
		}
	},

	/**
	 * Check if the provided cookie category is actively consented to by the user.
	 * @param {string} cookieName     - String name of cookie.
	 * @param {string} cookieCategory - Consent category. Ideally a string matching one of
	 *                                  this._consentGroupMappings, but also supports `C000#` strings.
	 * @return bool
	 */
	_isCookieConsentActive: function( cookieName, cookieCategory ) {
		// Get current user's active consent groups. Should be array of `[ 'C0001', 'C0002', ...]`.
		const activeConsentGroups = window.pmc_onetrust_helpers?.getActiveConsentGroups?.() || [];

		// If no active consent groups, return early.
		if ( ! Array.isArray(activeConsentGroups) || activeConsentGroups.length === 0 ) {
			return false;
		}

		// Util function to check cookie category before and after setting default.
		const isValidCategory = (value) => 'string' === typeof value && '' !== value;

		// Try to apply default category if `cookieCategory` not passed to function.
		if ( ! isValidCategory( cookieCategory ) ) {
			cookieCategory = this._getDefaultConsentCategoryForCookieName( cookieName );

			// Return early if category still unavailable after applying default
			if ( ! isValidCategory( cookieCategory ) ) {
				return false;
			}
		}

		// Check provided category for `C000#` syntax; else grab relevant mapped category value.
		const providedCategoryValue = cookieCategory.toLowerCase().startsWith('c000')
			? cookieCategory
			: this._consentGroupMappings[ cookieCategory ] || '';

		// Check active groups for mapped provided category value; return true if present.
		return activeConsentGroups.includes( providedCategoryValue );
	},
};
