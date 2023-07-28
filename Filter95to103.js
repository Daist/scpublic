const filterButton = document.querySelector('.search-filter-panel-v2__group-buttons button.sc-button');
    if (filterButton) {
        filterButton.click();
    }
    const checkbox = document.querySelector('label[data-testid="include-100-matches"] input[type="checkbox"]');
    if (!checkbox) {
        const button = document.querySelector('[data-v-370823ec] .dashed-button');
        if (button) {
            button.click();
        }
    }
    setTimeout(() => {
        document.querySelector('label[data-testid="include-100-matches"] input[type="checkbox"]').click();
        document.querySelector('label[data-testid="include-101-matches"] input[type="checkbox"]').click();
        document.querySelector('label[data-testid="include-102-matches"] input[type="checkbox"]').click();
        document.querySelector('label[data-testid="include-103-matches"] input[type="checkbox"]').click();
        document.querySelector('label[data-testid="include-fuzzy-matches-enabled"] input[type="checkbox"]').click();
		const inputBox = document.querySelector('input[data-testid="input-range-from-input"]');
		if (!inputBox){
			console.log("No input-range-from-input");
		}
        setTimeout(() => {
            inputBox.value = '';
            inputBox.value = '95';
            inputBox.dispatchEvent(new Event('input'));
        }, 600);
    }, 500);
    setTimeout(() => {
        filterButton.click();
    }, 2500);
