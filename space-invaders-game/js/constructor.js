function Space(hp, damage, img) {
    this.hp = hp;
    this.damage = damage;
    this.img = img;
    this.height = 400;
    this.width = 1366;
    this.shipWidth = 50;
    this.shipHeight = 50;
    this.shipMardgin = 10;
    this.friendPosX = this.width / 2 - this.shipWidth;
    this.friendPosY = this.height - this.shipHeight;
    this.friendShipSpeed = 4;
    this.rowEnemy = 4;
    this.columnEnemy = 9;
    this.bulletSpeed = 2;
}
Space.prototype.drawFriend = function () {
    let container = document.querySelector('.container');
    container.innerHTML = `<img src="${this.img}" alt="friend" style="top: ${this.friendPosY}px; left: ${this.friendPosX}px">`;
};
Space.prototype.drawEnemy = function (x,y) {
    let container = document.querySelector('.container');
    container.innerHTML += `<img src="${this.img}" alt="enemy" class="enemy" style="top: ${y}px; left: ${x}px">`;
};
Space.prototype.drawEnemys = function () {
    for ( let i = 0; i < this.rowEnemy; i++ ) {
        for ( let j = 0; j < this.columnEnemy; j++ ) {
            this.drawEnemy((this.shipWidth + this.shipMardgin) * j + 400, (this.shipHeight + this.shipMardgin) * i + this.shipMardgin);
        }
    }
};
Space.prototype.moveFriend = function (keyCode) {
    let friend1 = document.querySelector('[src="img/friend.png"]');
    if ( keyCode === 97 ) {
      this.friendPosX -= this.friendShipSpeed;
        friend1.style.left = this.friendPosX + 'px';
  } else if ( keyCode === 100 ) {
    this.friendPosX += this.friendShipSpeed;
    friend1.style.left = this.friendPosX + 'px';
  }
};
Space.prototype.friendFire = function () {
    let container = document.querySelector('.container');
    let bullet = document.querySelector('.bullet');
    if ( !bullet ) {
        this.bulletPosX = this.friendPosX + ( this.shipWidth / 2.3 );
        this.bulletPosY = this.friendPosY - (this.shipHeight / 9);
        container.innerHTML += `<img src="img/bullet.png" alt="bullet1" class="bullet" style="left: ${this.bulletPosX}px; top: ${this.bulletPosY}px;">`;

        function intervalBullet(thisA) {
            let intervall = setInterval(function () {
                let bullet = document.querySelector('.bullet');
                thisA.bulletPosY -= thisA.bulletSpeed;
                bullet.style.top = thisA.bulletPosY + 'px';

                let enemyes = document.querySelectorAll('.enemy');
                // console.log('enemy', enemyes);



                if (bullet.style.top < 0 + 'px') {
                    bullet.remove();
                    clearInterval(intervall);
                }
            }, 1000 / 120);
        }
        intervalBullet(this);
    }
};




let friend = new Space(10,2,'img/friend.png');
friend.drawFriend();
let enemy = new Space(10,1,'img/enemy.png');
enemy.drawEnemys();

window.addEventListener('keypress', function () {
    friend.moveFriend(event.keyCode);
});

window.addEventListener('keypress', function () {
    if ( event.keyCode === 32 ) {
        friend.friendFire();
    }
});
window.addEventListener('click', function () {
    console.log(event);
    // console.log(event.target.remove());
});


