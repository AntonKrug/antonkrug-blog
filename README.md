# Origin

Based on v0.5.4 release of https://github.com/ita-design-system/eleventy-libdoc


# Scripts

- `npm start` to serve and watch for changes for interactive build
- `npm run build` for one off  build
- `bash ./deploy-rsync.sh` to deploy online (faster, on windows needs msys2 install and pacman -S rsync)
- `bash ./deploy-scp.sh` to deploy online (slower, doesn't clean up destination, but on windows will work even with mingw64 git bash)

# Mingw64 vs msys2

In msys2 shell going to folder requires cd /c/users/<anton>.
While mingw64 git bash shares home with windows home, therefore the `.ssh` config can be shared with windows apps. While msys2 `.ssh` config is separate

# Mingw64 workaround

There is workaround to copy rsync binaries into mingw64 git bash install:

### from Git Bash (run as admin)

```
mkdir tmp && cd tmp
```

### install zstd unpacker for tar

```
curl -L https://github.com/facebook/zstd/releases/download/v1.5.5/zstd-v1.5.5-win64.zip --output xxx
unzip xxx
cp zstd-v1.5.5-win64/zstd.exe  'c:\Program Files\Git\usr\bin\'
rm -r * .*
```

### install rsync

```
curl -L https://repo.msys2.org/msys/x86_64/rsync-3.2.7-2-x86_64.pkg.tar.zst --output xxx
tar -I zstd -xvf xxx
cp usr/bin/rsync.exe 'c:\Program Files\Git\usr\bin\'
rm -r * .*

curl -L https://repo.msys2.org/msys/x86_64/libzstd-1.5.5-1-x86_64.pkg.tar.zst --output xxx
tar -I zstd -xvf xxx
cp usr/bin/msys-zstd-1.dll 'c:\Program Files\Git\usr\bin\'
rm -r * .*

curl -L https://repo.msys2.org/msys/x86_64/libxxhash-0.8.3-1-x86_64.pkg.tar.zst --output xxx
tar -I zstd -xvf xxx
cp usr/bin/msys-xxhash-0.dll 'c:\Program Files\Git\usr\bin\'
rm -r * .*

curl -L https://repo.msys2.org/msys/x86_64/liblz4-1.9.4-1-x86_64.pkg.tar.zst --output xxx
tar -I zstd -xvf xxx
cp usr/bin/msys-lz4-1.dll 'c:\Program Files\Git\usr\bin\'


curl -L https://repo.msys2.org/msys/x86_64/libopenssl-3.1.2-1-x86_64.pkg.tar.zst --output xxx
tar -I zstd -xvf xxx
cp usr/bin/msys-crypto-3.dll 'c:\Program Files\Git\usr\bin\'
```

```
cd .. && rm -r tmp
```