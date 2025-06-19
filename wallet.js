    // Currency Converter
    const convertBtn = document.getElementById('convert-btn');
    if (convertBtn) {
        const resetBtn = document.getElementById('reset-btn');
        const swapBtn = document.getElementById('swap-currencies');

        convertBtn.addEventListener('click', async function () {
            const amount = parseFloat(document.getElementById('amount').value);
            const from = document.getElementById('from').value;
            const to = document.getElementById('to').value;

            const resultDiv = document.getElementById('result');
            if (!amount || amount <= 0) {
                alert('Masukkan jumlah yang valid');
                return;
            }

            resultDiv.innerHTML = `
                <div class="loading-animation">
                    <div class="dot"></div><div class="dot"></div><div class="dot"></div>
                </div>
            `;

            try {
                await new Promise(res => setTimeout(res, 1000)); // Simulasi

                const rates = {
                    BTC: 34500,
                    ETH: 1850,
                    USD: 1,
                    IDR: 15000,
                    EUR: 0.85,
                    GBP: 0.73
                };

                const amountInUSD = amount * rates[from];
                const converted = amountInUSD / rates[to];

                const formatted = converted.toLocaleString('en-US', {
                    maximumFractionDigits: to === 'BTC' || to === 'ETH' ? 8 : 2
                });

                resultDiv.innerHTML = `
                    <div class="result-content">
                        <div class="from-amount">${amount} ${from}</div>
                        <div class="conversion-arrow"><i class="fas fa-arrow-right"></i></div>
                        <div class="to-amount">${formatted} ${to}</div>
                    </div>
                `;
            } catch (err) {
                console.error('Conversion error:', err);
                resultDiv.innerHTML = '<div class="error">Gagal melakukan konversi</div>';
            }
        });

        resetBtn?.addEventListener('click', () => {
            document.getElementById('amount').value = '';
            document.getElementById('result').innerHTML = `
                <div class="status-placeholder">
                    <i class="fas fa-search"></i>
                    <p>Masukkan jumlah untuk memulai konversi</p>
                </div>
            `;
        });

        swapBtn?.addEventListener('click', () => {
            const from = document.getElementById('from');
            const to = document.getElementById('to');
            [from.value, to.value] = [to.value, from.value];
        });
    }
