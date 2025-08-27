 document.addEventListener('DOMContentLoaded', function() {
            const applicationForm = document.getElementById('applicationForm');
            const smsModal = document.getElementById('smsModal');
            const smsPhone = document.getElementById('smsPhone');
            const closeModal = document.getElementById('closeModal');
            
            // 表单提交处理
            applicationForm.addEventListener('submit', function(event) {
                event.preventDefault();
                
                // 获取表单数据
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    position: document.getElementById('position').value,
                    message: document.getElementById('message').value
                };
                
                // 在实际应用中，这里应该发送数据到后端API
                // fetch('/api/submit-application', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify(formData)
                // })
                // .then(response => response.json())
                // .then(data => {
                //     if (data.success) {
                //         showSmsModal(formData.phone);
                //     }
                // })
                // .catch(error => {
                //     console.error('Error:', error);
                // });
                
                // 模拟API调用成功
                showSmsModal(formData.phone);
            });
            
            // 显示短信发送模态框
            function showSmsModal(phone) {
                smsPhone.textContent = phone;
                smsModal.style.display = 'flex';
                
                // 模拟短信发送过程
                simulateSmsSending();
            }
            
            // 模拟短信发送
            function simulateSmsSending() {
                const smsDetails = document.querySelector('.sms-details');
                smsDetails.style.opacity = '0';
                
                setTimeout(() => {
                    smsDetails.style.transition = 'opacity 0.5s ease';
                    smsDetails.style.opacity = '1';
                }, 800);
            }
            
            // 关闭模态框
            closeModal.addEventListener('click', function() {
                smsModal.style.display = 'none';
                applicationForm.reset();
            });
            
            // 点击模态框外部关闭
            smsModal.addEventListener('click', function(event) {
                if (event.target === smsModal) {
                    smsModal.style.display = 'none';
                    applicationForm.reset();
                }
            });
        });



            document.addEventListener('DOMContentLoaded', function() {
                const applicationForm = document.getElementById('applicationForm');
                const viewApplicationsLink = document.getElementById('viewApplications');
                const adminPanel = document.getElementById('adminPanel');
                const applicationsList = document.getElementById('applicationsList');
                const clearApplicationsBtn = document.getElementById('clearApplications');
                
                // 表单提交处理
                applicationForm.addEventListener('submit', function(event) {
                    event.preventDefault();
                    
                    // 获取表单数据
                    const application = {
                        id: Date.now(), // 使用时间戳作为唯一ID
                        name: document.getElementById('name').value,
                        email: document.getElementById('email').value,
                        phone: document.getElementById('phone').value,
                        position: document.getElementById('position').value,
                        message: document.getElementById('message').value,
                        date: new Date().toLocaleString('zh-CN')
                    };
                    
                    // 保存到localStorage
                    saveApplication(application);
                    
                    // 显示成功消息
                    // alert('感谢您的申请！我们会尽快与您联系。');
                    
                    // 重置表单
                    this.reset();
                });
                
                // 保存申请到localStorage
                function saveApplication(application) {
                    let applications = JSON.parse(localStorage.getItem('jobApplications')) || [];
                    applications.push(application);
                    localStorage.setItem('jobApplications', JSON.stringify(applications));
                }
                
                // 从localStorage获取所有申请
                function getApplications() {
                    return JSON.parse(localStorage.getItem('jobApplications')) || [];
                }
                
                // 显示申请记录
                function displayApplications() {
                    const applications = getApplications();
                    applicationsList.innerHTML = '';
                    
                    if (applications.length === 0) {
                        applicationsList.innerHTML = '<p>暂无申请记录</p>';
                        return;
                    }
                    
                    applications.forEach(app => {
                        const appElement = document.createElement('div');
                        appElement.className = 'application-item';
                        appElement.innerHTML = `
                            <h4>${app.name} - ${app.position}</h4>
                            <p><strong>邮箱:</strong> ${app.email}</p>
                            <p><strong>电话:</strong> ${app.phone}</p>
                            <p><strong>申请时间:</strong> ${app.date}</p>
                            <p><strong>自我介绍:</strong> ${app.message}</p>
                            <button class="btn delete-btn" data-id="${app.id}">删除</button>
                        `;
                        applicationsList.appendChild(appElement);
                    });
                    
                    // 添加删除按钮事件监听
                    document.querySelectorAll('.delete-btn').forEach(btn => {
                        btn.addEventListener('click', function() {
                            const id = parseInt(this.getAttribute('data-id'));
                            deleteApplication(id);
                            displayApplications();
                        });
                    });
                }
                
                // 删除单个申请
                function deleteApplication(id) {
                    let applications = getApplications();
                    applications = applications.filter(app => app.id !== id);
                    localStorage.setItem('jobApplications', JSON.stringify(applications));
                }
                
                // 清空所有申请
                function clearApplications() {
                    if (confirm('确定要清空所有申请记录吗？此操作不可撤销。')) {
                        localStorage.removeItem('jobApplications');
                        displayApplications();
                    }
                }
                
                // 查看申请记录链接点击事件
                viewApplicationsLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    adminPanel.style.display = adminPanel.style.display === 'none' ? 'block' : 'none';
                    if (adminPanel.style.display === 'block') {
                        displayApplications();
                    }
                });
                
                // 清空申请按钮点击事件
                clearApplicationsBtn.addEventListener('click', clearApplications);
            });