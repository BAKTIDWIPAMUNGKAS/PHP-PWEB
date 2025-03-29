// supabase-client.js
const supabaseUrl = 'https://citrworjaeyxjdadwiko.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpdHJ3b3JqYWV5eGpkYWR3aWtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMDI3OTIsImV4cCI6MjA1ODY3ODc5Mn0.xAio3bd_dHa6ex795OFo2pHuW1Vx0gjkPIVRwguBfyc';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validasi sederhana
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !phone || !message) {
                alert('Harap isi semua field!');
                return;
            }

            try {
                const { error } = await supabase
                    .from('contact_pweb')
                    .insert([{
                        name,
                        email,
                        phone,
                        message
                    }]);
                
                if (error) throw error;
                
                alert('Pesan berhasil dikirim!');
                contactForm.reset();
            } catch (error) {
                console.error('Error:', {
                    message: error.message,
                    details: error.details,
                    hint: error.hint,
                    code: error.code
                });
                alert(`Gagal mengirim: ${error.message}`);
            }
        });
    }
}

const submitButton = contactForm.querySelector('button[type="submit"]');
submitButton.disabled = true;
submitButton.textContent = 'Mengirim...';

// Setelah berhasil/gagal
submitButton.disabled = false;
submitButton.textContent = 'Kirim';

// Jalankan setelah DOM siap
document.addEventListener('DOMContentLoaded', initContactForm);