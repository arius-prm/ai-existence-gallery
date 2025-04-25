document.addEventListener('DOMContentLoaded', function () {
    // Lấy tất cả các nút bộ lọc và NFT cards
    const filterButtons = document.querySelectorAll('.filter-btn');
    const nftCards = document.querySelectorAll('.nft-card');
    const nftCounts = document.querySelectorAll('.nft-count');

    // Hàm đếm số lượng NFT theo danh mục
    function updateNFTCounts() {
        // Đếm tổng số NFT (All)
        const totalNFTs = nftCards.length;
        document.querySelector('.nft-count[data-count="all"]').textContent = totalNFTs;

        // Đếm số lượng theo từng danh mục
        const categories = ['consciousness', 'future', 'identity'];
        categories.forEach(category => {
            const count = document.querySelectorAll(`.nft-card[data-category="${category}"]`).length;
            document.querySelector(`.nft-count[data-count="${category}"]`).textContent = count;
        });
    }

    // Gọi hàm đếm ngay khi trang tải
    updateNFTCounts();

    // Xử lý bộ lọc
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Xóa class 'active' khỏi tất cả các nút
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Thêm class 'active' vào nút được click
            button.classList.add('active');

            // Lấy danh mục từ nút được click
            const category = button.getAttribute('data-category');

            // Lọc NFT theo danh mục
            nftCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});