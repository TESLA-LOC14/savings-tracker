class SavingsTracker {
    constructor() {
        this.savings = JSON.parse(localStorage.getItem('savings')) || [];
        this.goalAmount = 9000; // Default goal in cedis
        this.initialize();
    }

    initialize() {
        this.form = document.getElementById('savingsForm');
        this.historyList = document.getElementById('historyList');
        this.totalAmountDisplay = document.getElementById('totalAmount');
        this.progressFill = document.getElementById('progressFill');
        this.currentProgress = document.getElementById('currentProgress');
        this.goalAmountDisplay = document.getElementById('goalAmount');

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.updateDisplay();
    }

    handleSubmit(e) {
        e.preventDefault();
        const amount = parseFloat(document.getElementById('amount').value);
        const description = document.getElementById('description').value;

        const entry = {
            amount,
            description,
            date: new Date().toLocaleDateString()
        };

        this.savings.push(entry);
        this.saveToLocalStorage();
        this.updateDisplay();
        this.form.reset();
    }

    updateDisplay() {
        const total = this.calculateTotal();
        this.totalAmountDisplay.textContent = total.toFixed(2);
        this.updateProgress(total);
        this.updateHistory();
    }

    calculateTotal() {
        return this.savings.reduce((sum, entry) => sum + entry.amount, 0);
    }

    updateProgress(total) {
        const progress = (total / this.goalAmount) * 100;
        this.progressFill.style.width = `${Math.min(progress, 100)}%`;
        this.currentProgress.textContent = total.toFixed(2);
        this.goalAmountDisplay.textContent = this.goalAmount;
    }

    updateHistory() {
        this.historyList.innerHTML = '';
        [...this.savings].reverse().forEach(entry => {
            const item = document.createElement('div');
            item.className = 'history-item';
            item.innerHTML = `
                <span>${entry.description}</span>
                <span>₵${entry.amount.toFixed(2)} - ${entry.date}</span>
            `;
            this.historyList.appendChild(item);
        });
    }

    saveToLocalStorage() {
        localStorage.setItem('savings', JSON.stringify(this.savings));
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new SavingsTracker();
}); 