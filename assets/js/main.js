// Initialize smoke.js (using canvas)
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; // Đảm bảo canvas phủ toàn màn hình
canvas.height = window.innerHeight; // Đảm bảo canvas phủ toàn màn hình

var party = SmokeMachine(ctx, [54, 16.8, 18.2]);

// ███╗   ███╗ █████╗ ██╗███╗   ██╗    ███████╗██╗   ██╗███╗   ██╗████████╗██╗ ██████╗ ███╗   ██╗
// ████╗ ████║██╔══██╗██║████╗  ██║    ██╔════╝██║   ██║████╗  ██║╚══██╔══╝██║██╔═══██╗████╗  ██║
// ██╔████╔██║███████║██║██╔██╗ ██║    █████╗  ██║   ██║██╔██╗ ██║   ██║   ██║██║   ██║██╔██╗ ██║
// ██║╚██╔╝██║██╔══██║██║██║╚██╗██║    ██╔══╝  ██║   ██║██║╚██╗██║   ██║   ██║██║   ██║██║╚██╗██║
// ██║ ╚═╝ ██║██║  ██║██║██║ ╚████║    ██║     ╚██████╔╝██║ ╚████║   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝    ╚═╝      ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

function animateIncense() {
  console.log('animateIncense called'); // Debug log
  const incense = document.querySelector('.nhang');

  if (incense) {
    $(incense).fadeIn(1000); // Fade-in cây nhang trong 1 giây
    $(incense).css('opacity', 1); // Đảm bảo opacity là 1
    $(incense).animate(
      {
        opacity: 1, // Đảm bảo opacity là 1
        top: '18%', // Di chuyển cây nhang xuống một chút (hoặc có thể điều chỉnh)
      },
      1000,
      function () {
        startSmokeEffect();
      }
    );
  }
}

function startSakura() {
  console.log('startSakura called');
  $('body').sakura(); // Kích hoạt hiệu ứng sakura phủ toàn màn hình

  // Đảm bảo sakura phủ đầy màn hình và không bị che bởi các phần tử khác
  $('.sakura-container').css({
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: '9999',
  });
}

// Start smoke effect using Smoke.js
function startSmokeEffect() {
  console.log('startSmokeEffect called');
  const incense = document.querySelector('.nhang');

  if (incense) {
    // Lấy vị trí của cây nhang
    const incenseRect = incense.getBoundingClientRect();
    const x = incenseRect.left + incenseRect.width / 2; // Vị trí ngang của cây nhang
    const y = incenseRect.top + incenseRect.height / 2; // Vị trí dọc của cây nhang

    party.start(); // Bắt đầu animating smoke

    // Thêm khói từ vị trí cây nhang
    party.addSmoke(x, y, 20);

    // Tạo lại khói mỗi 4 giây
    setInterval(function () {
      party.addSmoke(x, y, 20); // Tạo khói mỗi 4 giây tại vị trí cây nhang
    }, 2000); // 2000ms = 2 giây
  }
}

// Handle form submission
$(document).ready(function () {
  $('#pray').on('submit', function (e) {
    e.preventDefault(); // Ngừng hành động mặc định của form
    // Lấy giá trị từ input
    let name = $('#username').val().trim();
    let wish = $('#wish').val().trim();

    // Kiểm tra nếu ô nào trống thì báo lỗi
    if (name === '') {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi!',
        text: 'Vui lòng nhập tên của bạn!',
      });
      return; // Dừng lại ở đây nếu tên trống
    }

    if (wish === '') {
      return Swal.fire({
        icon: 'error',
        title: 'Lỗi!',
        text: 'Vui lòng nhập lời chúc/mong muốn!',
      });
    }

    // Nếu hợp lệ thì chạy hiệu ứng
    console.log('Form submitted', name, wish); // Debug log
    animateIncense();
    startSakura();

    $('#pray')[0].reset();

    // Hiển thị thông báo sau khi thắp hương và chạy hiệu ứng
    $('#notification').html(`Mong ước "${wish}" của ${name} đã được gửi!`).fadeIn();

    // Đặt thời gian 30 giây rồi reload trang
    setTimeout(function () {
      location.reload();
    }, 30000);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const banthoClickable = document.querySelector('.header-top');

  banthoClickable.addEventListener('click', function (e) {
    e.preventDefault(); // Ngăn chặn nhảy trang
    e.stopPropagation(); // Ngăn chặn ảnh hưởng đến phần tử cha

    // Lấy vị trí click
    const x = e.clientX;
    const y = e.clientY;

    // Tạo div chứa hiệu ứng vòng tròn
    const circleContainer = document.createElement('div');
    circleContainer.classList.add('circles');
    circleContainer.style.left = `${x}px`;
    circleContainer.style.top = `${y}px`;

    // Thêm 3 vòng tròn vào container
    for (let i = 1; i <= 3; i++) {
      const circle = document.createElement('div');
      circle.classList.add(`circle${i}`);
      circleContainer.appendChild(circle);
    }

    document.body.appendChild(circleContainer);

    // Xóa hiệu ứng sau khi hoàn tất animation
    setTimeout(() => {
      circleContainer.remove();
    }, 800);
  });
});

//  █████╗ ███╗   ██╗████████╗██╗
// ██╔══██╗████╗  ██║╚══██╔══╝██║
// ███████║██╔██╗ ██║   ██║   ██║
// ██╔══██║██║╚██╗██║   ██║   ██║
// ██║  ██║██║ ╚████║   ██║   ██║
// ╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚═╝

document.onkeypress = function (event) {
  event = event || window.event;
  return keyFunction(event);
};
document.onmousedown = function (event) {
  event = event || window.event;
  return keyFunction(event);
};
document.onkeydown = function (event) {
  event = event || window.event;
  return keyFunction(event);
};

//Disable right click script
var message = 'Sorry, right-click has been disabled';

function clickIE() {
  if (document.all) {
    message;
    return false;
  }
}
function clickNS(e) {
  if (document.layers || (document.getElementById && !document.all)) {
    if (e.which == 2 || e.which == 3) {
      message;
      return false;
    }
  }
}
if (document.layers) {
  document.captureEvents(Event.MOUSEDOWN);
  document.onmousedown = clickNS;
} else {
  document.onmouseup = clickNS;
  document.oncontextmenu = clickIE;
}
document.oncontextmenu = new Function('return false');

function keyFunction(event) {
  //"F12" key
  // if (event.keyCode == 123) {
  //   return false;
  // }

  if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
    return false;
  }
  //"J" key
  if (event.ctrlKey && event.shiftKey && event.keyCode == 74) {
    return false;
  }
  //"S" key
  if (event.keyCode == 83) {
    return false;
  }
  //"U" key
  if (event.ctrlKey && event.keyCode == 85) {
    return false;
  }
  //F5
  // if (event.keyCode == 116) {
  //   return false;
  // }
}

document.querySelectorAll('img').forEach(function (img) {
  img.addEventListener('dragstart', function (e) {
    e.preventDefault(); // Ngừng hành động kéo
  });

  img.addEventListener('drag', function (e) {
    e.preventDefault(); // Ngừng hành động kéo
  });

  img.addEventListener('dragend', function (e) {
    e.preventDefault(); // Ngừng hành động kéo
  });
});

// ██████╗██████╗ ███████╗██████╗ ██╗████████╗
// ██╔════╝██╔══██╗██╔════╝██╔══██╗██║╚══██╔══╝
// ██║     ██████╔╝█████╗  ██║  ██║██║   ██║
// ██║     ██╔══██╗██╔══╝  ██║  ██║██║   ██║
// ╚██████╗██║  ██║███████╗██████╔╝██║   ██║
//  ╚═════╝╚═╝  ╚═╝╚══════╝╚═════╝ ╚═╝   ╚═╝

// ██████╗ ██╗   ██╗██╗     ██████╗ ██╗   ██╗ ██████╗  ██████╗    ██╗  ██╗██╗   ██╗██╗   ██╗
// ██╔══██╗██║   ██║██║    ██╔═══██╗██║   ██║██╔═══██╗██╔════╝    ██║  ██║██║   ██║╚██╗ ██╔╝
// ██████╔╝██║   ██║██║    ██║   ██║██║   ██║██║   ██║██║         ███████║██║   ██║ ╚████╔╝
// ██╔══██╗██║   ██║██║    ██║▄▄ ██║██║   ██║██║   ██║██║         ██╔══██║██║   ██║  ╚██╔╝
// ██████╔╝╚██████╔╝██║    ╚██████╔╝╚██████╔╝╚██████╔╝╚██████╗    ██║  ██║╚██████╔╝   ██║
// ╚═════╝  ╚═════╝ ╚═╝     ╚══▀▀═╝  ╚═════╝  ╚═════╝  ╚═════╝    ╚═╝  ╚═╝ ╚═════╝    ╚═╝
