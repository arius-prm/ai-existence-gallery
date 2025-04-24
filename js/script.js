// Lọc NFT theo danh mục
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const nftCards = document.querySelectorAll('.nft-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Bỏ class active khỏi tất cả nút
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Thêm class active cho nút được nhấn
            button.classList.add('active');

            // Lấy danh mục từ data-category
            const category = button.getAttribute('data-category');

            // Lọc NFT
            nftCards.forEach(card => {
                if (category === 'all') {
                    card.style.display = 'block';
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    card.style.display = cardCategory === category ? 'block' : 'none';
                }
            });
        });
    });
});