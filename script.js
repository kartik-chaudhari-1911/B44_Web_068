document.getElementById('loanForm').addEventListener('submit', function (event) {
    event.preventDefault();

    //code by Kolla Harsha
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100;
    const loanTerm = parseInt(document.getElementById('loanTerm').value) * 12; 

    // Calculate Monthly Payment
    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm) || loanAmount <= 0 || interestRate < 0 || loanTerm <= 0) {
        alert("Please enter valid numbers.");
        return;
    }

    // Monthly interest rate
    const monthlyRate = interestRate / 12;
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1);

    
    document.getElementById('calculatedResult').innerHTML = `<h3>Monthly Payment: ₹${monthlyPayment.toFixed(2)}</h3>`;
});
//code by Kolla Harsha
function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('navMenu');//code by Kolla Harsha
    const body = document.body;
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('show');
    body.classList.toggle('menu-open');//code by Kolla Harsha
}


document.addEventListener('click', (e) => {
    const hamburger = document.querySelector('.hamburger');//code by Kolla Harsha
    const navMenu = document.getElementById('navMenu');
    
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('show');
    }
});


document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', () => {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.getElementById('navMenu');
        const body = document.body;
        
        hamburger.classList.remove('active');
        navMenu.classList.remove('show');
        body.classList.remove('menu-open');
    });
});

//code by Kolla Harsha
