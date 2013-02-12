echo -e "\nDeleting unneccessary packages\n"
pacman -R --noconfirm cryptsetup dash diffutils file fuse gettext heirloom-mailx jfsutils less licenses man-db man-pages mdadm mkinitcpio mkinitcpio-busybox ntfs-3g pciutils ppp procps-ng psmisc vi which wpa_supplicant xfsprogs 

echo -e "\nConfiguring Arch"
pacman -Syu --noconfirm
pacman-key --init
sed -i 's/#en_GB/en_GB/g' /etc/locale.gen
locale-gen

echo -e "\nInstalling additional packages\n"
pacman -S --noconfirm python2 python2-pip mysql mysql-python

echo -e "\nInstalling python libraries needed\n"
wget --no-check-certificate https://raw.github.com/michboon/comp2014/master/Python/requirements.txt
pip2 install -r requirements.txt

echo -e "\nConfiguring mysql"
wget --no-check-certificate https://raw.github.com/michboon/comp2014/master/Scripts/robohome.sql
chmod 777 robohome.sql
systemctl start mysqld.service
systemctl enable mysqld.service
systemctl daemon-reload
mysql -u root --password= robohome < robohome.sql
