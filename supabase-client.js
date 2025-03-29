document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi Supabase dengan pendekatan yang lebih aman
    const initializeSupabase = () => {
        const supabaseUrl = 'https://citrworjaeyxjdadwiko.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpdHJ3b3JqYWV5eGpkYWR3aWtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMDI3OTIsImV4cCI6MjA1ODY3ODc5Mn0.xAio3bd_dHa6ex795OFo2pHuW1Vx0gjkPIVRwguBfyc';
        
        // Pastikan objek supabase tersedia secara global
        if (!window.supabase) {
            window.supabase = supabase.createClient(supabaseUrl, supabaseKey);
            console.log('Supabase client initialized successfully');
        }
        return window.supabase;
    };

    try {
        const supabase = initializeSupabase();
        
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                const submitButton = contactForm.querySelector('button[type="submit"]');
                
                try {
                    submitButton.disabled = true;
                    submitButton.textContent = 'Mengirim...';

                    const formData = {
                        name: document.getElementById('name').value.trim(),
                        email: document.getElementById('email').value.trim(),
                        phone: document.getElementById('phone').value.trim(),
                        message: document.getElementById('message').value.trim(),
                        created_at: new Date().toISOString()
                    };

                    console.log('Data to be submitted:', formData);

                    const { data, error } = await supabase
                        .from('contact_pweb')
                        .insert([formData])
                        .select();

                    if (error) throw error;

                    if (data && data.length > 0) {
                        alert('Pesan berhasil dikirim! ID: ' + data[0].id);
                        contactForm.reset();
                    } else {
                        throw new Error('Data tidak terkirim (tidak ada response data)');
                    }
                } catch (error) {
                    console.error('Submission error:', {
                        message: error.message,
                        details: error.details,
                        code: error.code
                    });
                    alert('Gagal mengirim pesan: ' + error.message);
                } finally {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Kirim';
                }
            });
        }
    } catch (error) {
        console.error('Initialization error:', error);
        alert('Terjadi kesalahan dalam menginisialisasi aplikasi: ' + error.message);
    }
});
