document.addEventListener('DOMContentLoaded', function () {
    // Lấy các phần tử cần thiết
    const filterButtons = document.querySelectorAll('.filter-btn');
    const nftCards = document.querySelectorAll('.nft-card');
    const nftCounts = document.querySelectorAll('.nft-count');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageNumbersContainer = document.getElementById('page-numbers');

    // Cấu hình phân trang
    const itemsPerPage = 6; // Số NFT mỗi trang
    let currentPage = 1;
    let filteredCards = Array.from(nftCards); // Danh sách NFT sau khi lọc

    // Hàm đếm số lượng NFT theo danh mục
    function updateNFTCounts(cards) {
        // Đếm tổng số NFT (All)
        const totalNFTs = cards.length;
        document.querySelector('.nft-count[data-count="all"]').textContent = totalNFTs;

        // Đếm số lượng theo từng danh mục
        const categories = ['consciousness', 'future', 'identity'];
        categories.forEach(category => {
            const count = cards.filter(card => card.getAttribute('data-category') === category).length;
            document.querySelector(`.nft-count[data-count="${category}"]`).textContent = count;
        });
    }

    // Hàm hiển thị phân trang
    function renderPagination() {
        const totalItems = filteredCards.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        // Tạo danh sách số trang
        pageNumbersContainer.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('div');
            pageBtn.classList.add('page-number');
            pageBtn.textContent = i;
            if (i === currentPage) {
                pageBtn.classList.add('active');
            }
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                renderNFTs();
                renderPagination();
            });
            pageNumbersContainer.appendChild(pageBtn);
        }

        // Cập nhật trạng thái nút Back/Next
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
    }

    // Hàm hiển thị NFT theo trang
    function renderNFTs() {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        filteredCards.forEach((card, index) => {
            if (index >= start && index < end) {
                card.classList.add('visible');
            } else {
                card.classList.remove('visible');
            }
        });
    }

    // Gọi hàm ban đầu
    updateNFTCounts(Array.from(nftCards));
    renderNFTs();
    renderPagination();

    // Xử lý bộ lọc
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.getAttribute('data-category');
            filteredCards = Array.from(nftCards).filter(card => 
                category === 'all' || card.getAttribute('data-category') === category
            );

            currentPage = 1; // Reset về trang 1 khi lọc
            updateNFTCounts(filteredCards);
            renderNFTs();
            renderPagination();
        });
    });

    // Xử lý nút Back/Next
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderNFTs();
            renderPagination();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderNFTs();
            renderPagination();
        }
    });
});