// Tunggu sampai DOM siap dan library Supabase terload
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi Supabase
    const supabaseUrl = 'https://citrworjaeyxjdadwiko.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpdHJ3b3JqYWV5eGpkYWR3aWtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMDI3OTIsImV4cCI6MjA1ODY3ODc5Mn0.xAio3bd_dHa6ex795OFo2pHuW1Vx0gjkPIVRwguBfyc';
    const supabase = supabase.createClient(supabaseUrl, supabaseKey);

    // Tangani submit formulir
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            const submitButton = contactForm.querySelector('button[type="submit"]');
            
            try {
                // Disable tombol saat proses submit
                submitButton.disabled = true;
                submitButton.textContent = 'Mengirim...';
                
                // Kumpulkan data formulir
                const formData = {
                    name: document.getElementById('name').value.trim(),
                    email: document.getElementById('email').value.trim(),
                    phone: document.getElementById('phone').value.trim(),
                    message: document.getElementById('message').value.trim(),
                    created_at: new Date().toISOString()
                };

                // Kirim ke Supabase
                const { data, error } = await supabase
                    .from('contact_pweb')
                    .insert([formData])
                    .select();

                if (error) throw error;
                
                alert('Pesan berhasil dikirim!');
                contactForm.reset();
            } catch (error) {
                console.error('Error:', error);
                alert('Gagal mengirim pesan: ' + error.message);
            } finally {
                // Aktifkan kembali tombol
                submitButton.disabled = false;
                submitButton.textContent = 'Kirim';
            }
        });
    }
});
