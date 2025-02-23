
document.addEventListener('DOMContentLoaded', function() {
    const numberInput = document.getElementById('numberInput');
    const numberSlider = document.getElementById('numberSlider');
    const sliderValue = document.getElementById('sliderValue');
    const checkButton = document.getElementById('checkButton');
    const resultDiv = document.getElementById('result');
    const achievementDiv = document.getElementById('achievement');
    const scoreValue = document.getElementById('scoreValue');
    const streakValue = document.getElementById('streakValue');
    const levelProgress = document.getElementById('levelProgress');
    const levelBadge = document.getElementById('levelBadge');
    const challengeProgress = document.getElementById('challengeProgress');
    
    let score = 0;
    let streak = 0;
    let level = 1;
    let progress = 0;
    let evenMultiple5Count = 0;
    
    function showAchievement(text) {
        achievementDiv.querySelector('#achievementText').textContent = text;
        achievementDiv.style.display = 'block';
        setTimeout(() => {
            achievementDiv.style.display = 'none';
        }, 3000);
    }
    
    function updateStats(isCorrect, isEven, isMultiple5) {
        if (isCorrect) {
            score += 10 * (1 + Math.floor(streak / 5));
            streak++;
            progress++;
            
            if (isEven && isMultiple5) {
                evenMultiple5Count++;
                challengeProgress.style.width = `${(evenMultiple5Count / 3) * 100}%`;
                
                if (evenMultiple5Count === 3) {
                    score += 50;
                    showAchievement('Challenge Completed! +50 points');
                    evenMultiple5Count = 0;
                    challengeProgress.style.width = '0%';
                }
            }
            
            if (progress >= 5) {
                level++;
                progress = 0;
                showAchievement(`Level Up! You're now level ${level}`);
            }
        } else {
            streak = 0;
        }
        
        scoreValue.textContent = score;
        streakValue.textContent = streak;
        levelProgress.textContent = `${progress}/5`;
        levelBadge.textContent = level;
        
        if (streak >= 5) {
            showAchievement(`${streak} Streak! Bonus points enabled!`);
        }
    }
    
    // Sync the input and slider
    numberInput.addEventListener('input', function() {
        if (this.value >= 1 && this.value <= 100) {
            numberSlider.value = this.value;
            sliderValue.textContent = this.value;
        }
    });
    
    numberSlider.addEventListener('input', function() {
        numberInput.value = this.value;
        sliderValue.textContent = this.value;
    });
    
    function checkNumber() {
        resultDiv.innerHTML = '';
        resultDiv.style.display = 'none';
        
        const number = parseInt(numberInput.value);
        
        if (isNaN(number) || number < 1 || number > 100) {
            resultDiv.innerHTML = '<div class="error"><i class="fas fa-exclamation-triangle"></i> Please enter a valid number between 1 and 100.</div>';
            resultDiv.style.display = 'block';
            updateStats(false);
            return;
        }
        
        const isEven = number % 2 === 0;
        const isMultiple5 = number % 5 === 0;
        
        const evenOddMessage = document.createElement('div');
        evenOddMessage.className = `message ${isEven ? 'even' : 'odd'}`;
        evenOddMessage.innerHTML = `<i class="fas fa-${isEven ? 'check' : 'times'}"></i> ${number} is ${isEven ? 'even' : 'odd'}`;
        evenOddMessage.innerHTML = `<i class="fas ${isEven ? 'fa-check' : 'fa-times'}"></i> ${number} is ${isEven ? 'even' : 'odd'}.`;
        resultDiv.appendChild(evenOddMessage);
        
        const multipleMessage = document.createElement('div');
        multipleMessage.className = `message ${isMultiple5 ? 'multiple' : 'not-multiple'}`;
        multipleMessage.innerHTML = `<i class="fas ${isMultiple5 ? 'fa-check' : 'fa-times'}"></i> ${number} is ${isMultiple5 ? '' : 'not '}a multiple of 5.`;
        resultDiv.appendChild(multipleMessage);
        
        if (isEven && isMultiple5) {
            const congratsMessage = document.createElement('div');
            congratsMessage.className = 'message congrats';
            congratsMessage.innerHTML = '<i class="fas fa-trophy"></i> Congratulations! Your number is both even and a multiple of 5! <i class="fas fa-trophy"></i>';
            resultDiv.appendChild(congratsMessage);
        }
        
        resultDiv.style.display = 'block';
        updateStats(true, isEven, isMultiple5);
    }
    
    // Check the number when button is clicked
    checkButton.addEventListener('click', checkNumber);
    
    // Also allow Enter key to submit
    numberInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkNumber();
        }
    });
});
