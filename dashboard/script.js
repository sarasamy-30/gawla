document.addEventListener("DOMContentLoaded", function() {
    // 1. Line Chart (Bookings Over Time)
    const lineCtx = document.getElementById('lineChart').getContext('2d');
    
    // Create gradient for the line chart
    const gradient = lineCtx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(181, 155, 117, 0.2)');   
    gradient.addColorStop(1, 'rgba(181, 155, 117, 0)');

    new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: ['JAN 10', 'FEB 20', 'MAR 30', 'APR 10', 'MAY 20', 'JUN 30', 'JUL 10', 'AUG 20', 'SEP 30', 'OCT 10', 'NOV 20', 'DEC 30'],
            datasets: [{
                label: 'Bookings',
                data: [30, 45, 35, 60, 40, 75, 45, 50, 70, 40, 65, 50],
                borderColor: '#b59b75',
                backgroundColor: gradient,
                borderWidth: 2,
                pointRadius: 0, // Hide points for smoother look
                pointHoverRadius: 4,
                fill: true,
                tension: 0.4 // Smooth curves
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // We have a custom legend in HTML
                },
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#333',
                    bodyColor: '#666',
                    borderColor: '#ddd',
                    borderWidth: 1,
                    padding: 10,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y + ' Bookings';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: '#adb5bd',
                        font: {
                            size: 10
                        }
                    }
                },
                y: {
                    display: false, // Hide Y axis as in the design
                    min: 0
                }
            }
        }
    });

    // 2. Bar Chart (Monthly Revenue)
    const barCtx = document.getElementById('barChart').getContext('2d');
    
    new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY'],
            datasets: [{
                label: 'Revenue',
                data: [30, 55, 95, 50, 65],
                backgroundColor: [
                    '#e9ecef', // Light gray
                    '#dcd8cd', // Tan
                    '#242448', // Navy highlight
                    '#e9ecef', 
                    '#dcd8cd'
                ],
                borderRadius: 0,
                barThickness: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y + 'k EGP';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: '#adb5bd',
                        font: {
                            size: 10
                        }
                    }
                },
                y: {
                    display: false, // Hide Y axis
                    min: 0
                }
            }
        }
    });

    // 3. User Growth Bar Chart (Users Tab)
    const userGrowthCanvas = document.getElementById('userGrowthChart');
    if (userGrowthCanvas) {
        const userGrowthCtx = userGrowthCanvas.getContext('2d');
        new Chart(userGrowthCtx, {
            type: 'bar',
            data: {
                labels: ['OCT', 'NOV', 'DEC', 'JAN', 'FEB'],
                datasets: [{
                    label: 'Users',
                    data: [150, 200, 180, 250, 320],
                    backgroundColor: [
                        '#e9ecef',
                        '#e9ecef',
                        '#e9ecef',
                        '#e9ecef',
                        '#b59b75' // Theme color for active bar
                    ],
                    borderRadius: 0,
                    barThickness: 75
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            color: '#adb5bd',
                            font: {
                                size: 10,
                                weight: 'bold'
                            }
                        }
                    },
                    y: {
                        display: false,
                        min: 0
                    }
                }
            }
        });
    }

    // 4. Pagination Logic for Users (Static HTML)
    const paginationContainer = document.getElementById('users-pagination');
    const paginationInfo = document.getElementById('pagination-info');
    const prevBtn = document.querySelector('.prev-page');
    const nextBtn = document.querySelector('.next-page');
    const userRows = document.querySelectorAll('.user-row');

    if (paginationContainer && paginationInfo) {
        // First 3 spans with class 'page-num' are the dynamic block
        const pageNumsNodes = paginationContainer.querySelectorAll('.page-num');
        const middlePageNums = Array.from(pageNumsNodes).slice(0, 3);
        const lastPageBtn = pageNumsNodes[3]; // The "248" span
        
        let currentBlockStart = 1;
        let currentPage = 1;
        const totalUsers = 2482;
        const itemsPerPage = 10;

        function updatePaginationUI() {
            // Update the 3 middle numbers
            middlePageNums.forEach((span, index) => {
                const pageNum = currentBlockStart + index;
                span.textContent = pageNum;
                span.setAttribute('data-page', pageNum);
                
                // Set active class
                if (pageNum === currentPage) {
                    span.className = 'page-num active-page rounded-1 theme-bg text-white d-flex align-items-center justify-content-center cursor-pointer shadow-sm mx-1';
                    span.style.width = '25px';
                    span.style.height = '25px';
                    span.style.fontSize = '0.8rem';
                } else {
                    span.className = 'page-num text-muted cursor-pointer mx-1';
                    span.style.width = 'auto';
                    span.style.height = 'auto';
                    span.style.fontSize = '0.9rem';
                }
            });

            // Update info text
            const start = ((currentPage - 1) * itemsPerPage) + 1;
            let end = currentPage * itemsPerPage;
            if (end > totalUsers) end = totalUsers;
            paginationInfo.textContent = `Showing ${start}-${end} of 2,482 users`;

            // Enforce condition to show max 10 users.
            // Since we only have 4 static rows, we show them on page 1, and hide them on other pages to simulate pagination.
            userRows.forEach((row, index) => {
                if (currentPage === 1 && index < 10) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }

        // Add click events to numbers
        middlePageNums.forEach(span => {
            span.addEventListener('click', function() {
                currentPage = parseInt(this.getAttribute('data-page'));
                updatePaginationUI();
            });
        });

        if (lastPageBtn) {
            lastPageBtn.addEventListener('click', function() {
                currentPage = 248;
                currentBlockStart = 246; // Show 246, 247, 248
                updatePaginationUI();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentPage < 248) {
                    currentPage++;
                    if (currentPage >= currentBlockStart + 3) {
                        currentBlockStart = Math.min(245, currentBlockStart + 3);
                    }
                    updatePaginationUI();
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    if (currentPage < currentBlockStart) {
                        currentBlockStart = Math.max(1, currentBlockStart - 3);
                    }
                    updatePaginationUI();
                }
            });
        }

        updatePaginationUI();
    }

    // 4.1 Pagination Logic for Places
    const placesPaginationContainer = document.getElementById('places-pagination');
    const placesPaginationInfo = document.getElementById('places-pagination-info');
    const placesPrevBtn = document.querySelector('.places-prev-page');
    const placesNextBtn = document.querySelector('.places-next-page');
    const placeRows = document.querySelectorAll('#v-pills-places .user-row');

    if (placesPaginationContainer && placesPaginationInfo) {
        const placesPageNumsNodes = placesPaginationContainer.querySelectorAll('.places-page-num');
        const placesMiddlePageNums = Array.from(placesPageNumsNodes).slice(0, 3);
        const placesLastPageBtn = placesPageNumsNodes[3]; 
        
        let currentPlacesBlockStart = 1;
        let currentPlacesPage = 1;
        const totalPlaces = 1284;
        const totalPlacesPages = Math.ceil(totalPlaces / 10);
        const itemsPerPlacesPage = 10;

        function updatePlacesPaginationUI() {
            placesMiddlePageNums.forEach((span, index) => {
                const pageNum = currentPlacesBlockStart + index;
                span.textContent = pageNum;
                span.setAttribute('data-page', pageNum);
                
                if (pageNum === currentPlacesPage) {
                    span.className = 'places-page-num active-page rounded-1 theme-bg text-white d-flex align-items-center justify-content-center cursor-pointer shadow-sm mx-1';
                    span.style.width = '25px';
                    span.style.height = '25px';
                    span.style.fontSize = '0.8rem';
                } else {
                    span.className = 'places-page-num text-muted cursor-pointer mx-1';
                    span.style.width = 'auto';
                    span.style.height = 'auto';
                    span.style.fontSize = '0.9rem';
                }
            });

            const start = ((currentPlacesPage - 1) * itemsPerPlacesPage) + 1;
            let end = currentPlacesPage * itemsPerPlacesPage;
            if (end > totalPlaces) end = totalPlaces;
            placesPaginationInfo.textContent = `Showing ${start}-${end} of 1,284 places`;

            placeRows.forEach((row, index) => {
                if (currentPlacesPage === 1 && index < itemsPerPlacesPage) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }

        placesMiddlePageNums.forEach(span => {
            span.addEventListener('click', function() {
                currentPlacesPage = parseInt(this.getAttribute('data-page'));
                updatePlacesPaginationUI();
            });
        });

        if (placesLastPageBtn) {
            placesLastPageBtn.addEventListener('click', function() {
                currentPlacesPage = totalPlacesPages;
                currentPlacesBlockStart = totalPlacesPages - 2; 
                updatePlacesPaginationUI();
            });
        }

        if (placesNextBtn) {
            placesNextBtn.addEventListener('click', () => {
                if (currentPlacesPage < totalPlacesPages) {
                    currentPlacesPage++;
                    if (currentPlacesPage >= currentPlacesBlockStart + 3) {
                        currentPlacesBlockStart = Math.min(totalPlacesPages - 2, currentPlacesBlockStart + 3);
                    }
                    updatePlacesPaginationUI();
                }
            });
        }

        if (placesPrevBtn) {
            placesPrevBtn.addEventListener('click', () => {
                if (currentPlacesPage > 1) {
                    currentPlacesPage--;
                    if (currentPlacesPage < currentPlacesBlockStart) {
                        currentPlacesBlockStart = Math.max(1, currentPlacesBlockStart - 3);
                    }
                    updatePlacesPaginationUI();
                }
            });
        }

        updatePlacesPaginationUI();
    }

    // 4.2 Pagination Logic for Packages
    const packagesPaginationContainer = document.getElementById('packages-pagination');
    const packagesPaginationInfo = document.getElementById('packages-pagination-info');
    const packagesPrevBtn = document.querySelector('.packages-prev-page');
    const packagesNextBtn = document.querySelector('.packages-next-page');
    const packageRows = document.querySelectorAll('.package-row');

    if (packagesPaginationContainer && packagesPaginationInfo) {
        const packagesPageNumsNodes = packagesPaginationContainer.querySelectorAll('.packages-page-num');
        const packagesMiddlePageNums = Array.from(packagesPageNumsNodes).slice(0, 3);
        const packagesLastPageBtn = packagesPageNumsNodes[3]; 
        
        let currentPackagesBlockStart = 1;
        let currentPackagesPage = 1;
        const totalPackages = 2482;
        const itemsPerPackagesPage = 10;

        function updatePackagesPaginationUI() {
            packagesMiddlePageNums.forEach((span, index) => {
                const pageNum = currentPackagesBlockStart + index;
                span.textContent = pageNum;
                span.setAttribute('data-page', pageNum);
                
                if (pageNum === currentPackagesPage) {
                    span.className = 'packages-page-num active-page rounded-1 theme-bg text-white d-flex align-items-center justify-content-center cursor-pointer shadow-sm mx-1';
                    span.style.width = '25px';
                    span.style.height = '25px';
                    span.style.fontSize = '0.8rem';
                } else {
                    span.className = 'packages-page-num text-muted cursor-pointer mx-1';
                    span.style.width = 'auto';
                    span.style.height = 'auto';
                    span.style.fontSize = '0.9rem';
                }
            });

            const start = ((currentPackagesPage - 1) * itemsPerPackagesPage) + 1;
            let end = currentPackagesPage * itemsPerPackagesPage;
            if (end > totalPackages) end = totalPackages;
            packagesPaginationInfo.textContent = `Showing ${start}-${end} of 2,482 packages`;

            packageRows.forEach((row, index) => {
                if (currentPackagesPage === 1 && index < itemsPerPackagesPage) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }

        packagesMiddlePageNums.forEach(span => {
            span.addEventListener('click', function() {
                currentPackagesPage = parseInt(this.getAttribute('data-page'));
                updatePackagesPaginationUI();
            });
        });

        if (packagesLastPageBtn) {
            packagesLastPageBtn.addEventListener('click', function() {
                currentPackagesPage = 248;
                currentPackagesBlockStart = 246; 
                updatePackagesPaginationUI();
            });
        }

        if (packagesNextBtn) {
            packagesNextBtn.addEventListener('click', () => {
                if (currentPackagesPage < 248) {
                    currentPackagesPage++;
                    if (currentPackagesPage >= currentPackagesBlockStart + 3) {
                        currentPackagesBlockStart = Math.min(245, currentPackagesBlockStart + 3);
                    }
                    updatePackagesPaginationUI();
                }
            });
        }

        if (packagesPrevBtn) {
            packagesPrevBtn.addEventListener('click', () => {
                if (currentPackagesPage > 1) {
                    currentPackagesPage--;
                    if (currentPackagesPage < currentPackagesBlockStart) {
                        currentPackagesBlockStart = Math.max(1, currentPackagesBlockStart - 3);
                    }
                    updatePackagesPaginationUI();
                }
            });
        }

        updatePackagesPaginationUI();
    }

    // 5. Custom Filter Dropdowns Logic
    const filterDropdowns = document.querySelectorAll('.filter-dropdown');
    filterDropdowns.forEach(dropdown => {
        const btnText = dropdown.querySelector('.dropdown-text');
        const items = dropdown.querySelectorAll('.dropdown-item');
        
        items.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Update main button text
                const value = this.getAttribute('data-value');
                btnText.textContent = value;
                
                // Remove active styling from all items
                items.forEach(i => {
                    i.classList.remove('active-item');
                    const icon = i.querySelector('.item-icon');
                    if (icon) icon.classList.add('d-none');
                });
                
                // Add active styling to clicked item
                this.classList.add('active-item');
                const activeIcon = this.querySelector('.item-icon');
                if (activeIcon) activeIcon.classList.remove('d-none');
            });
        });
    });

    // 6. Edit & Delete Logic (Users & Places)
    let currentRow = null;
    let currentEditType = null; // 'user' or 'place'

    document.addEventListener('click', function(e) {
        // Handle Upload Button Click (Global)
        if (e.target.closest('.upload-trigger')) {
            const targetId = e.target.closest('.upload-trigger').getAttribute('data-target');
            const fileInput = document.querySelector(targetId);
            if (fileInput) fileInput.click();
        }

        // Handle Edit Button Click
        if (e.target.closest('.edit-btn')) {
            currentRow = e.target.closest('tr');
            
            // Check if it's a User, Place or Package
            const isUserTable = currentRow.closest('#v-pills-users');
            const isPlaceTable = currentRow.closest('#v-pills-places');
            const isPackageTable = currentRow.closest('#v-pills-packages');
            const isOfferTable = currentRow.closest('#v-pills-offers');
            const isBookingTable = currentRow.closest('#v-pills-bookings') || currentRow.closest('#bookingsTable');

            if (isUserTable) {
                currentEditType = 'user';
                const name = currentRow.querySelector('h6').textContent.trim();
                const email = currentRow.cells[1].textContent.trim();
                const status = currentRow.querySelector('.badge').textContent.trim();

                document.getElementById('editUserName').value = name;
                document.getElementById('editUserEmail').value = email;

                if (status.includes('Active')) {
                    document.getElementById('editStatusActive').checked = true;
                } else {
                    document.getElementById('editStatusInactive').checked = true;
                }
            } else if (isPlaceTable) {
                currentEditType = 'place';
                const name = currentRow.cells[2].textContent.trim();
                const location = currentRow.cells[3].textContent.trim();
                const category = currentRow.cells[4].textContent.trim();
                const ratingText = currentRow.cells[5].textContent.trim();

                document.getElementById('editPlaceName').value = name;
                document.getElementById('editPlaceLocation').value = location;
                document.getElementById('editPlaceRating').value = ratingText;
                document.getElementById('editPlaceDescription').value = ""; 

                // Update Category Dropdown
                const categoryInput = document.getElementById('editPlaceCategory');
                if (categoryInput) categoryInput.value = category;
                const categorySpan = document.getElementById('editPlaceCategoryValue');
                if (categorySpan) categorySpan.textContent = category;
            } else if (currentRow.closest('#v-pills-hidden-gems')) {
                currentEditType = 'gem';
                const name = currentRow.cells[2].textContent.trim();
                const location = currentRow.cells[3].textContent.trim();
                const category = currentRow.cells[4].textContent.trim();
                const ratingText = currentRow.cells[6].textContent.trim().replace('4.8', '').trim() || currentRow.cells[6].textContent.trim();
                
                document.getElementById('editGemName').value = name;
                document.getElementById('editGemLocation').value = location;
                document.getElementById('editGemRating').value = ratingText;
                
                // Update Category Dropdown
                const categoryInput = document.getElementById('editGemCategory');
                if (categoryInput) categoryInput.value = category;
                const categorySpan = document.getElementById('editGemCategoryValue');
                if (categorySpan) categorySpan.textContent = category;
            } else if (isPackageTable) {
                currentEditType = 'package';
                const name = currentRow.cells[2].textContent.trim();
                const ratingText = currentRow.cells[5].textContent.trim();
                
                // Get all place names from the badges
                const placeBadges = currentRow.cells[3].querySelectorAll('.badge');
                const places = Array.from(placeBadges).map(b => b.textContent.trim());

                document.getElementById('editPackageName').value = name;
                document.getElementById('editPackageDescription').value = ""; 
                document.getElementById('editPackageRating').value = ratingText;

                // Update Category Dropdown
                const categoryValue = "Cultural"; // Default logic
                const categoryInput = document.getElementById('editPackageCategory');
                if (categoryInput) categoryInput.value = categoryValue;
                const categorySpan = document.getElementById('editPackageCategoryValue');
                if (categorySpan) categorySpan.textContent = categoryValue;

                // Reset and Check checkboxes
                const container = document.getElementById('editPackageIncludedPlacesContainer');
                if (container) {
                    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
                    checkboxes.forEach(cb => {
                        cb.checked = places.some(p => p.toLowerCase().includes(cb.value.toLowerCase()));
                    });
                }
            } else if (isOfferTable) {
                currentEditType = 'offer';
                const title = currentRow.cells[1].textContent.trim();
                const discount = currentRow.cells[2].textContent.trim();
                const appliedTo = currentRow.cells[3].textContent.trim();
                const startDate = currentRow.cells[4].textContent.trim();
                const endDate = currentRow.cells[5].textContent.trim();

                document.getElementById('editOfferTitle').value = title;
                document.getElementById('editOfferDiscount').value = discount;
                document.getElementById('editOfferStartDate').value = startDate;
                document.getElementById('editOfferEndDate').value = endDate;

                if (appliedTo.toLowerCase().includes('package')) {
                    document.getElementById('editApplyPackage').checked = true;
                } else {
                    document.getElementById('editApplyPlace').checked = true;
                }
            } else if (isBookingTable) {
                currentEditType = 'booking';
                const bookingId = currentRow.cells[0].textContent.trim();
                const userName = currentRow.cells[1].textContent.trim();
                const item = currentRow.cells[2].textContent.trim();
                const statusText = currentRow.cells[6].textContent.trim();

                document.getElementById('editBookingId').value = bookingId;
                document.getElementById('editBookingUserName').value = userName;
                document.getElementById('editBookingItem').value = item;

                if (statusText.includes('Confirmed')) {
                    document.getElementById('bookingStatusConfirmed').checked = true;
                } else if (statusText.includes('Pending')) {
                    document.getElementById('bookingStatusPending').checked = true;
                } else if (statusText.includes('Canceled') || statusText.includes('Cancelled')) {
                    document.getElementById('bookingStatusCancelled').checked = true;
                } else if (statusText.includes('Rejected')) {
                    document.getElementById('bookingStatusRejected').checked = true;
                }
            }
        }

        // Handle View Booking Button Click
        if (e.target.closest('.view-booking-btn')) {
            const row = e.target.closest('tr');
            const userName = row.cells[1].textContent.trim();
            const item = row.cells[2].textContent.trim();
            const date = row.cells[3].textContent.trim();
            const tickets = row.cells[4].textContent.trim();
            const price = row.cells[5].textContent.trim();

            document.getElementById('detailsBookingUserName').value = userName;
            document.getElementById('detailsBookingItem').value = item;
            document.getElementById('detailsBookingDate').value = date;
            document.getElementById('detailsBookingTickets').value = tickets;
            document.getElementById('detailsBookingPrice').value = price;
        }

        // Handle Delete Button Click
        if (e.target.closest('.delete-btn')) {
            currentRow = e.target.closest('tr');
        }

        // Handle Quick Status Toggle (Yellow Icon)
        if (e.target.closest('.status-toggle-btn')) {
            const row = e.target.closest('tr');
            const badge = row.querySelector('.status-badge');
            if (!badge) return;
            const isCurrentlyActive = badge.textContent.trim().includes('Active');
            const isOffer = row.classList.contains('offer-row');
            const inactiveText = isOffer ? 'Expired' : 'Inactive';

            if (isCurrentlyActive) {
                badge.className = 'badge status-badge bg-secondary bg-opacity-10 rounded-pill px-3 py-2 fw-medium d-inline-flex align-items-center gap-2';
                badge.style.color = '#242448';
                badge.innerHTML = `<span class="rounded-circle" style="width: 6px; height: 6px; background-color: #242448;"></span> ${inactiveText}`;
            } else {
                badge.className = 'badge status-badge bg-success-subtle text-success rounded-pill px-3 py-2 fw-medium d-inline-flex align-items-center gap-2';
                badge.style.color = '';
                badge.innerHTML = '<span class="rounded-circle bg-success" style="width: 6px; height: 6px;"></span> Active';
            }
        }
    });

    // Handle Edit Form Submit (User)
    const editUserForm = document.getElementById('editUserForm');
    if (editUserForm) {
        editUserForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (currentRow && currentEditType === 'user') {
                const newName = document.getElementById('editUserName').value;
                const newEmail = document.getElementById('editUserEmail').value;
                const isActive = document.getElementById('editStatusActive').checked;

                currentRow.querySelector('h6').textContent = newName;
                currentRow.cells[1].textContent = newEmail;
                const badge = currentRow.querySelector('.status-badge');
                if (isActive) {
                    badge.className = 'badge status-badge bg-success-subtle text-success rounded-pill px-3 py-2 fw-medium d-inline-flex align-items-center gap-2';
                    badge.innerHTML = '<span class="rounded-circle bg-success" style="width: 6px; height: 6px;"></span> Active';
                } else {
                    badge.className = 'badge status-badge bg-secondary bg-opacity-10 rounded-pill px-3 py-2 fw-medium d-inline-flex align-items-center gap-2';
                    badge.style.color = '#242448';
                    badge.innerHTML = '<span class="rounded-circle" style="width: 6px; height: 6px; background-color: #242448;"></span> Inactive';
                }

                const modal = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
                if (modal) modal.hide();
            }
        });
    }

    // Handle Edit Form Submit (Place)
    const editPlaceForm = document.getElementById('editPlaceForm');
    if (editPlaceForm) {
        editPlaceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (currentRow && currentEditType === 'place') {
                const newName = document.getElementById('editPlaceName').value;
                const newLocation = document.getElementById('editPlaceLocation').value;
                const newCategory = document.getElementById('editPlaceCategory').value;
                const newRating = document.getElementById('editPlaceRating').value;

                currentRow.cells[2].innerHTML = `<div class="fw-medium" style="color: #242448;">${newName}</div>`;
                currentRow.cells[3].textContent = newLocation;
                currentRow.cells[4].textContent = newCategory;
                currentRow.cells[5].innerHTML = `<i class="fas fa-star text-warning me-1"></i>${newRating}`;

                const modal = bootstrap.Modal.getInstance(document.getElementById('editPlaceModal'));
                if (modal) modal.hide();
            }
        });
    }

    // Handle Edit Form Submit (Package)
    const editPackageForm = document.getElementById('editPackageForm');
    if (editPackageForm) {
        editPackageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (currentRow && currentEditType === 'package') {
                const newName = document.getElementById('editPackageName').value;
                const newRating = document.getElementById('editPackageRating').value;
                const newCategory = document.getElementById('editPackageCategory').value;

                currentRow.cells[2].textContent = newName;
                currentRow.cells[5].innerHTML = `<i class="fas fa-star text-warning me-1"></i>${newRating}`;

                const modal = bootstrap.Modal.getInstance(document.getElementById('editPackageModal'));
                if (modal) modal.hide();
            }
        });
    }

    // Handle Edit Form Submit (Offer)
    const editOfferForm = document.getElementById('editOfferForm');
    if (editOfferForm) {
        editOfferForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (currentRow && currentEditType === 'offer') {
                const newTitle = document.getElementById('editOfferTitle').value;
                const newDiscount = document.getElementById('editOfferDiscount').value;
                const newStartDate = document.getElementById('editOfferStartDate').value;
                const newEndDate = document.getElementById('editOfferEndDate').value;
                
                const selectedRadio = document.querySelector('input[name="editApplyTo"]:checked');
                const applyToText = selectedRadio.nextElementSibling.textContent.trim();

                currentRow.cells[1].textContent = newTitle;
                currentRow.cells[2].textContent = newDiscount;
                currentRow.cells[3].textContent = applyToText;
                currentRow.cells[4].textContent = newStartDate;
                currentRow.cells[5].textContent = newEndDate;

                const modal = bootstrap.Modal.getInstance(document.getElementById('editOfferModal'));
                if (modal) modal.hide();
            }
        });
    }



    // Handle Confirm Delete (Generic)
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', function() {
            if (currentRow) {
                currentRow.remove();
                const userModal = bootstrap.Modal.getInstance(document.getElementById('deleteUserModal'));
                if (userModal) userModal.hide();
                currentRow = null;
            }
        });
    }

    const confirmDeletePlaceBtn = document.querySelector('#deletePlaceModal button.theme-btn');
    if (confirmDeletePlaceBtn) {
        confirmDeletePlaceBtn.addEventListener('click', function() {
            if (currentRow) {
                currentRow.remove();
                const placeModal = bootstrap.Modal.getInstance(document.getElementById('deletePlaceModal'));
                if (placeModal) placeModal.hide();
                currentRow = null;
            }
        });
    }

    const confirmDeletePackageBtn = document.getElementById('confirmDeletePackageBtn');
    if (confirmDeletePackageBtn) {
        confirmDeletePackageBtn.addEventListener('click', function() {
            if (currentRow) {
                currentRow.remove();
                const packageModal = bootstrap.Modal.getInstance(document.getElementById('deletePackageModal'));
                if (packageModal) packageModal.hide();
                currentRow = null;
            }
        });
    }
    // Handle Multi-select dropdown text update
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('form-check-input') && e.target.closest('.custom-multi-select')) {
            const container = e.target.closest('.custom-multi-select');
            const countSpan = container.querySelector('.selected-count');
            const checkedCount = container.querySelectorAll('input[type="checkbox"]:checked').length;
            
            if (checkedCount === 0) {
                countSpan.textContent = "Select places..";
            } else if (checkedCount === 1) {
                const firstLabel = container.querySelector('input[type="checkbox"]:checked + label').textContent;
                countSpan.textContent = firstLabel;
            } else {
                countSpan.textContent = `${checkedCount} places selected`;
            }
        }
    });

    // Handle Custom Single-select dropdown
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('dropdown-item') && e.target.closest('.custom-single-select')) {
            e.preventDefault();
            const container = e.target.closest('.custom-single-select');
            const value = e.target.getAttribute('data-value');
            const text = e.target.textContent;
            
            const valueSpan = container.querySelector('.selected-value');
            if (valueSpan) valueSpan.textContent = text;
            
            const hiddenInput = container.querySelector('input[type="hidden"]');
            if (hiddenInput) hiddenInput.value = value;
        }
    });
    // 8. Hidden Gems Pagination Logic
    const gemsPaginationContainer = document.getElementById('gems-pagination');
    if (gemsPaginationContainer) {
        const gemsPageNumsNodes = gemsPaginationContainer.querySelectorAll('.gems-page-num');
        const gemsMiddlePageNums = Array.from(gemsPageNumsNodes).slice(0, 3);
        const gemsLastPageBtn = gemsPageNumsNodes[3]; 

        let currentGemsBlockStart = 1;
        let currentGemsPage = 1;
        const totalGemsPages = 129;

        function updateGemsPaginationUI() {
            gemsMiddlePageNums.forEach((span, index) => {
                const pageNum = currentGemsBlockStart + index;
                if (pageNum < totalGemsPages) {
                    span.textContent = pageNum;
                    span.setAttribute('data-page', pageNum);
                    span.style.display = '';
                    
                    if (pageNum === currentGemsPage) {
                        span.className = 'gems-page-num active-page rounded-1 theme-bg text-white d-flex align-items-center justify-content-center cursor-pointer shadow-sm mx-1';
                        span.style.width = '25px';
                        span.style.height = '25px';
                        span.style.fontSize = '0.8rem';
                    } else {
                        span.className = 'gems-page-num text-muted cursor-pointer mx-1';
                        span.style.width = 'auto';
                        span.style.height = 'auto';
                        span.style.fontSize = '0.9rem';
                    }
                } else {
                    span.style.display = 'none';
                }
            });

            const info = document.getElementById('gems-pagination-info');
            const gemRows = document.querySelectorAll('.gem-row');
            
            if (info) {
                const start = (currentGemsPage - 1) * 10 + 1;
                const end = Math.min(currentGemsPage * 10, 1284);
                info.textContent = `Showing ${start}-${end} of 1,284 gems`;
            }

            gemRows.forEach((row, index) => {
                if (currentGemsPage === 1 && index < 10) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }

        gemsMiddlePageNums.forEach(span => {
            span.addEventListener('click', function() {
                currentGemsPage = parseInt(this.getAttribute('data-page'));
                updateGemsPaginationUI();
            });
        });

        if (gemsLastPageBtn) {
            gemsLastPageBtn.addEventListener('click', function() {
                currentGemsPage = totalGemsPages;
                currentGemsBlockStart = Math.max(1, totalGemsPages - 3);
                updateGemsPaginationUI();
            });
        }

        const prevBtn = gemsPaginationContainer.querySelector('.gems-prev-page');
        const nextBtn = gemsPaginationContainer.querySelector('.gems-next-page');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentGemsPage > 1) {
                    currentGemsPage--;
                    if (currentGemsPage < currentGemsBlockStart) {
                        currentGemsBlockStart = Math.max(1, currentGemsBlockStart - 3);
                    }
                    updateGemsPaginationUI();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentGemsPage < totalGemsPages) {
                    currentGemsPage++;
                    if (currentGemsPage >= currentGemsBlockStart + 3) {
                        currentGemsBlockStart = Math.min(totalGemsPages - 3, currentGemsBlockStart + 3);
                    }
                    updateGemsPaginationUI();
                }
            });
        }
    }

    // 9. Image Preview Logic for Add/Edit Gem & Place Modals
    const addGemInput = document.getElementById('addGemImageInput');
    if (addGemInput) {
        addGemInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = document.getElementById('addGemPreview');
                    preview.innerHTML = `<img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover;">`;
                }
                reader.readAsDataURL(this.files[0]);
            }
        });
    }

    const editGemInput = document.getElementById('editGemImageInput');
    if (editGemInput) {
        editGemInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = document.getElementById('editGemPreview');
                    preview.innerHTML = `<img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover;">`;
                }
                reader.readAsDataURL(this.files[0]);
            }
        });
    }

    const addPlaceInput = document.getElementById('addPlaceImageInput');
    if (addPlaceInput) {
        addPlaceInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = document.getElementById('addPlacePreview');
                    preview.innerHTML = `<img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover;">`;
                }
                reader.readAsDataURL(this.files[0]);
            }
        });
    }

    const editPlaceInput = document.getElementById('editPlaceImageInput');
    if (editPlaceInput) {
        editPlaceInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = document.getElementById('editPlacePreview');
                    preview.innerHTML = `<img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover;">`;
                }
                reader.readAsDataURL(this.files[0]);
            }
        });
    }

    // 5. Offers Pagination Logic
    const offersPaginationContainer = document.getElementById('offers-pagination');
    const offersPaginationInfo = document.getElementById('offers-pagination-info');
    const offerRows = document.querySelectorAll('.offer-row');

    if (offersPaginationContainer && offersPaginationInfo) {
        const pageNumsNodes = offersPaginationContainer.querySelectorAll('.offers-page-num');
        const middlePageNums = Array.from(pageNumsNodes).slice(0, 3);
        const lastPageBtn = pageNumsNodes[3]; 

        let currentOffersBlockStart = 1;
        let currentOffersPage = 1;
        const totalOffers = 2482;
        const totalOffersPages = 249;
        const itemsPerPage = 10;

        function updateOffersPaginationUI() {
            // Update the 3 middle numbers
            middlePageNums.forEach((span, index) => {
                const pageNum = currentOffersBlockStart + index;
                if (pageNum < totalOffersPages) {
                    span.textContent = pageNum;
                    span.setAttribute('data-page', pageNum);
                    span.style.display = '';
                    
                    if (pageNum === currentOffersPage) {
                        span.className = 'offers-page-num active-page rounded-1 theme-bg text-white d-flex align-items-center justify-content-center cursor-pointer shadow-sm mx-1';
                        span.style.width = '25px';
                        span.style.height = '25px';
                        span.style.fontSize = '0.8rem';
                    } else {
                        span.className = 'offers-page-num text-muted cursor-pointer mx-1';
                        span.style.width = 'auto';
                        span.style.height = 'auto';
                        span.style.fontSize = '0.8rem';
                    }
                } else {
                    span.style.display = 'none';
                }
            });

            // Update info text
            const start = ((currentOffersPage - 1) * itemsPerPage) + 1;
            let end = currentOffersPage * itemsPerPage;
            if (end > totalOffers) end = totalOffers;
            offersPaginationInfo.textContent = `Showing ${start}-${end} of 2,482 offers`;

            // Simulate pagination
            offerRows.forEach((row, index) => {
                if (currentOffersPage === 1) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }

        // Click events for numbers
        middlePageNums.forEach(span => {
            span.addEventListener('click', function() {
                currentOffersPage = parseInt(this.getAttribute('data-page'));
                updateOffersPaginationUI();
            });
        });

        if (lastPageBtn) {
            lastPageBtn.addEventListener('click', function() {
                currentOffersPage = totalOffersPages;
                currentOffersBlockStart = Math.max(1, totalOffersPages - 3);
                updateOffersPaginationUI();
            });
        }

        const prevBtn = offersPaginationContainer.querySelector('.offers-prev-page');
        const nextBtn = offersPaginationContainer.querySelector('.offers-next-page');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentOffersPage > 1) {
                    currentOffersPage--;
                    if (currentOffersPage < currentOffersBlockStart) {
                        currentOffersBlockStart = Math.max(1, currentOffersBlockStart - 3);
                    }
                    updateOffersPaginationUI();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentOffersPage < totalOffersPages) {
                    currentOffersPage++;
                    if (currentOffersPage >= currentOffersBlockStart + 3) {
                        currentOffersBlockStart = Math.min(totalOffersPages - 3, currentOffersBlockStart + 3);
                    }
                    updateOffersPaginationUI();
                }
            });
        }
    }
    // Status Toggle Logic for Events
    const eventToggleButtons = document.querySelectorAll('.status-toggle-btn');
    eventToggleButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const statusBadge = row.querySelector('.badge');
            const statusText = statusBadge.textContent.trim();
            const statusDot = statusBadge.querySelector('span');

            if (statusText === 'Active') {
                statusBadge.style.color = '#94a3b8';
                statusBadge.className = 'badge bg-secondary bg-opacity-10 rounded-pill px-3 py-2 fw-medium';
                statusDot.style.backgroundColor = '#94a3b8';
                statusBadge.innerHTML = '<span class="rounded-circle d-inline-block me-1" style="width: 6px; height: 6px; background-color: #94a3b8;"></span> Inactive';
            } else {
                statusBadge.style.color = '#22c55e';
                statusBadge.className = 'badge bg-success bg-opacity-10 rounded-pill px-3 py-2 fw-medium';
                statusDot.style.backgroundColor = '#22c55e';
                statusBadge.innerHTML = '<span class="rounded-circle d-inline-block me-1" style="width: 6px; height: 6px; background-color: #22c55e;"></span> Active';
            }
        });
    });

    // Pagination Logic for Events and Gems
    function setupPagination(prefix, totalItems, itemsPerPage = 10) {
        const paginationContainer = document.getElementById(`${prefix}-pagination`);
        if (!paginationContainer) return;

        const infoText = document.getElementById(`${prefix}-pagination-info`);
        const pageNums = Array.from(paginationContainer.querySelectorAll(`.${prefix}-page-num`));
        const prevBtn = paginationContainer.querySelector(`.${prefix}-prev-page`);
        const nextBtn = paginationContainer.querySelector(`.${prefix}-next-page`);
        
        // Dynamic row selection based on prefix
        let rowClass = prefix.endsWith('s') ? prefix.slice(0, -1) : prefix;
        const rows = document.querySelectorAll(`.${rowClass}-row`);
        
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        let currentPage = 1;
        let currentBlockStart = 1;

        // Identify middle buttons (usually the first 3) and the last button
        const middleButtons = pageNums.slice(0, 3);
        const lastButton = pageNums[pageNums.length - 1];

        function updateUI() {
            // Update middle buttons text and data
            middleButtons.forEach((span, index) => {
                const pageNum = currentBlockStart + index;
                if (pageNum <= totalPages) {
                    span.textContent = pageNum;
                    span.setAttribute('data-page', pageNum);
                    span.style.display = '';
                    
                    // Set active class
                    if (pageNum === currentPage) {
                        span.className = `${prefix}-page-num active-page rounded-1 theme-bg text-white d-flex align-items-center justify-content-center cursor-pointer shadow-sm mx-1`;
                        span.style.width = '25px';
                        span.style.height = '25px';
                        span.style.fontSize = '0.8rem';
                    } else {
                        span.className = `${prefix}-page-num text-muted cursor-pointer mx-1`;
                        span.style.width = 'auto';
                        span.style.height = 'auto';
                        span.style.fontSize = '0.9rem';
                    }
                } else {
                    span.style.display = 'none';
                }
            });

            // Update separator and last button visibility
            const separator = paginationContainer.querySelector('.text-muted.mx-1:not(.' + prefix + '-page-num)');
            if (lastButton) {
                if (currentBlockStart + 3 >= totalPages) {
                    if (separator) separator.style.display = 'none';
                    lastButton.style.display = 'none';
                } else {
                    if (separator) separator.style.display = '';
                    lastButton.style.display = '';
                    lastButton.textContent = totalPages;
                    lastButton.setAttribute('data-page', totalPages);
                }
            }

            // Show/Hide rows for demo purposes
            // In a real app, this would trigger an API call or filter the actual data
            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            rows.forEach((row, index) => {
                if (index >= start && index < end) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });

            // Update info text
            if (infoText) {
                const actualEnd = Math.min(end, totalItems);
                infoText.textContent = `Showing ${start + 1}-${actualEnd} of ${totalItems.toLocaleString()} ${prefix}`;
            }
        }

        // Add event listeners
        middleButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                currentPage = parseInt(this.getAttribute('data-page'));
                updateUI();
            });
        });

        if (lastButton) {
            lastButton.addEventListener('click', function() {
                currentPage = totalPages;
                currentBlockStart = Math.max(1, totalPages - 2);
                updateUI();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    if (currentPage >= currentBlockStart + 3) {
                        currentBlockStart = Math.min(totalPages - 2, currentBlockStart + 3);
                    }
                    updateUI();
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    if (currentPage < currentBlockStart) {
                        currentBlockStart = Math.max(1, currentBlockStart - 3);
                    }
                    updateUI();
                }
            });
        }

        // Initial update
        updateUI();
    }

    setupPagination('events', 24, 10);
    setupPagination('gems', 1284, 10);
    setupPagination('bookings', 2482, 10);

    // Custom Single Select Logic (Modals)
    document.querySelectorAll('.custom-single-select').forEach(select => {
        const btn = select.querySelector('.dropdown-toggle');
        const display = btn.querySelector('.selected-value');
        const items = select.querySelectorAll('.dropdown-item');
        const otherContainer = select.querySelector('.other-time-container');
        const otherInput = select.querySelector('.other-time-input');
        const backBtn = select.querySelector('.back-to-list');

        items.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const val = this.getAttribute('data-value');
                
                if (val === 'Other') {
                    btn.classList.add('d-none');
                    if (otherContainer) {
                        otherContainer.classList.remove('d-none');
                        if (otherInput) otherInput.focus();
                    }
                } else {
                    if (display) display.textContent = val;
                }
            });
        });

        if (backBtn) {
            backBtn.addEventListener('click', () => {
                if (otherContainer) otherContainer.classList.add('d-none');
                btn.classList.remove('d-none');
                if (display) display.textContent = 'Select time slots....';
            });
        }
    });

    console.log("Gawla Dashboard Script Loaded Successfully");
    // Manually initialize all dropdowns to ensure functionality
    const dropdownTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="dropdown"]'));
    // Fail-safe: Manually toggle dropdowns if Bootstrap logic is blocked
    document.addEventListener('click', function (e) {
        const toggle = e.target.closest('[data-bs-toggle="dropdown"]');
        if (toggle) {
            const menu = toggle.nextElementSibling;
            if (menu && menu.classList.contains('dropdown-menu')) {
                // Let Bootstrap handle it first, but if it doesn't show, we force it
                setTimeout(() => {
                    if (!menu.classList.contains('show')) {
                        console.log("Forcing dropdown show via manual script");
                        const dp = bootstrap.Dropdown.getOrCreateInstance(toggle);
                        dp.toggle();
                    }
                }, 50);
            }
        }
    });
});
