document.addEventListener('DOMContentLoaded', function () {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle?.querySelector('i');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon?.classList.replace('fa-moon', 'fa-sun');
    } else {
        document.body.classList.remove('light-mode');
        themeIcon?.classList.replace('fa-sun', 'fa-moon');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const isLight = document.body.classList.toggle('light-mode');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');

            if (isLight) {
                themeIcon?.classList.replace('fa-moon', 'fa-sun');
            } else {
                themeIcon?.classList.replace('fa-sun', 'fa-moon');
            }
        });
    }

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
    }

    // Particles.js
    if (window.particlesJS) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#2563eb" },
                shape: { type: "circle" },
                opacity: { value: 0.1, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#2563eb",
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            },
            retina_detect: true
        });
    }

    // Fetch prices
    async function fetchCryptoPrices() {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,pepe,solana,binancecoin&vs_currencies=usd&include_24hr_change=true');
            const data = await response.json();

            // Bitcoin
            const btcPrice = data.bitcoin.usd;
            const btcChange = data.bitcoin.usd_24h_change;
            document.getElementById('btc-price').textContent = `$${btcPrice.toLocaleString()}`;
            document.getElementById('btc-price-card').textContent = `$${btcPrice.toLocaleString()}`;
            updatePriceChange('btc', btcChange);

            // Ethereum
            const ethPrice = data.ethereum.usd;
            const ethChange = data.ethereum.usd_24h_change;
            document.getElementById('eth-price-card').textContent = `$${ethPrice.toLocaleString()}`;
            updatePriceChange('eth', ethChange);

            // PEPE
            const pepePrice = data.pepe.usd;
            const pepeChange = data.pepe.usd_24h_change;
            document.getElementById('pepe-price-card').textContent = `$${pepePrice}`;
            updatePriceChange('pepe', pepeChange);

            // SOLANA
            const solPrice = data.solana.usd;
            const solChange = data.solana.usd_24h_change;
            document.getElementById('sol-price-card').textContent = `$${solPrice.toLocaleString()}`;
            updatePriceChange('sol', solChange);

            // BNB
            const bnbPrice = data.binancecoin.usd;
            const bnbChange = data.binancecoin.usd_24h_change;
            document.getElementById('bnb-price-card').textContent = `$${bnbPrice.toLocaleString()}`;
            updatePriceChange('bnb', bnbChange);

        } catch (error) {
            console.error('Error fetching crypto prices:', error);
        }
    }

    function updatePriceChange(coin, change) {
        const span = document.querySelector(`#${coin}-price-card + .price-change`);
        if (span) {
            const isPositive = change >= 0;
            span.textContent = `${isPositive ? '+' : ''}${change.toFixed(2)}%`;
            span.classList.remove('positive', 'negative');
            span.classList.add(isPositive ? 'positive' : 'negative');
        }
    }

    // Chart inits
    function initCharts() {
        const chartConfigs = [
            {
                id: 'btc-chart',
                color: '#f59e0b',
                bg: 'rgba(245, 158, 11, 0.1)',
                data: [34200, 34350, 34400, 34520],
                label: 'BTC Price'
            },
            {
                id: 'eth-chart',
                color: '#8b5cf6',
                bg: 'rgba(139, 92, 246, 0.1)',
                data: [1820, 1835, 1842, 1850],
                label: 'ETH Price'
            },
            {
                id: 'pepe-chart',
                color: '#22c55e',
                bg: 'rgba(34, 197, 94, 0.1)',
                data: [0.0000012, 0.00000125, 0.00000128, 0.00000130],
                label: 'PEPE Price'
            },
            {
                id: 'sol-chart',
                color: '#16c784',
                bg: 'rgba(22, 199, 132, 0.1)',
                data: [135, 136, 138, 139],
                label: 'SOL Price'
            },
            {
                id: 'bnb-chart',
                color: '#f59e0b',
                bg: 'rgba(245, 158, 11, 0.1)',
                data: [560, 562, 565, 567],
                label: 'BNB Price'
            }
        ];

        chartConfigs.forEach(cfg => {
            const ctx = document.getElementById(cfg.id)?.getContext('2d');
            if (ctx) {
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['1H', '6H', '12H', '24H'],
                        datasets: [{
                            label: cfg.label,
                            data: cfg.data,
                            borderColor: cfg.color,
                            backgroundColor: cfg.bg,
                            tension: 0.4,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: { x: { display: false }, y: { display: false } }
                    }
                });
            }
        });
    }

    // Run functions
    fetchCryptoPrices();
    initCharts();
});
