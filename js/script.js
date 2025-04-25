document.addEventListener('DOMContentLoaded', function () {
    // Lấy các phần tử cần thiết
    const filterButtons = document.querySelectorAll('.filter-btn');
    const nftCards = document.querySelectorAll('.nft-card');
    const nftCounts = document.querySelectorAll('.nft-count');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageNumbersContainer = document.getElementById('page-numbers');
    const modal = document.getElementById('nft-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalLink = document.getElementById('modal-link');
    const closeModal = document.getElementById('close-modal');

    // Cấu hình phân trang
    const itemsPerPage = 6;
    let currentPage = 1;
    let filteredCards = Array.from(nftCards);

    // Hàm đếm số lượng NFT
    function updateNFTCounts(cards) {
        const totalNFTs = cards.length;
        document.querySelector('.nft-count[data-count="all"]').textContent = totalNFTs;

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

    // Xử lý click vào NFT
nftCards.forEach(card => {
    card.addEventListener('click', () => {
        const imgSrc = card.querySelector('img').src;
        const title = card.querySelector('h3').textContent;
        const description = card.querySelector('p').textContent; // Lấy mô tả
        const link = card.querySelector('.nft-button').href;

        modalImage.src = imgSrc;
        modalTitle.textContent = title;
        modalDescription.textContent = description; // Hiển thị mô tả
        modalLink.href = link;

        modal.style.display = 'flex';
    });
});
    // Đóng modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Đóng modal khi click bên ngoài
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

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

            currentPage = 1;
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