interface Runtime {
}

interface Module {
    print(str: string): void;
    printErr(str: string): void;
    arguments: string[];
    preInit: { ():  void }[];
    preRun: { ():  void }[];
    postRun: { ():  void }[];
    noExitRuntime: boolean;

    Runtime: Runtime;

    ccall(ident: string, returnType: string, argTypes: string[], args: any[]): any;
    cwrap(ident: string, returnType: string, argTypes: string[]): any;

    setValue(ptr: number, value: any, type: string, noSafe: boolean): void;
    getValue(ptr: number, type: string, noSafe: boolean): any;

    ALLOC_NORMAL: number;
    ALLOC_STACK: number;
    ALLOC_STATIC: number;
    ALLOC_DYNAMIC: number;
    ALLOC_NONE: number;

    allocate(slab: any, types: string, allocator: number, ptr: number): number;
    allocate(slab: any, types: string[], allocator: number, ptr: number): number;

    Pointer_stringify(ptr: number, length?: number): string;
    UTF16ToString(ptr: number): string;
    stringToUTF16(str: string, outPtr: number): void;
    UTF32ToString(ptr: number): string;
    stringToUTF32(str: string, outPtr: number): void;

    // USE_TYPED_ARRAYS == 1
    HEAP: Int32Array;
    IHEAP: Int32Array;
    FHEAP: Float64Array;

    // USE_TYPED_ARRAYS == 2
    HEAP8: Int8Array;
    HEAP16: Int16Array;
    HEAP32: Int32Array;
    HEAPU8:  Uint8Array;
    HEAPU16: Uint16Array;
    HEAPU32: Uint32Array;
    HEAPF32: Float32Array;
    HEAPF64: Float64Array;

    TOTAL_STACK: number;
    TOTAL_MEMORY: number;
    FAST_MEMORY: number;

    addOnPreRun(cb: () => any): void;
    addOnInit(cb: () => any): void;
    addOnPreMain(cb: () => any): void;
    addOnExit(cb: () => any): void;
    addOnPostRun(cb: () => any): void;

	// Tools
    intArrayFromString(stringy: string, dontAddNull?: boolean, length?: number): number[];
    intArrayToString(array: number[]): string;
    writeStringToMemory(str: string, buffer: number, dontAddNull: boolean): void;
    writeArrayToMemory(array: number[], buffer: number): void;
    writeAsciiToMemory(str: string, buffer: number, dontAddNull: boolean);

    addRunDependency(id: any): void;
    removeRunDependency(id: any): void;


    preloadedImages: any;
    preloadedAudios: any;

    _malloc(size: number): number;
    _free(ptr: number): void;
}

declare module FS {
    interface Lookup {
        path: string;
        node: FSNode;
    }

    interface FSStream {}
    interface FSNode {}
    interface ErrnoError {}

    var ignorePermissions: boolean;
    var trackingDelegate: any;
    var tracking: any;
    var genericErrors: any;

    //
    // paths
    //
    function lookupPath(path: string, opts: any): Lookup;
    function getPath(node: FSNode): string;

    //
    // nodes
    //
    function isFile(mode: number): boolean;
    function isDir(mode: number): boolean;
    function isLink(mode: number): boolean;
    function isChrdev(mode: number): boolean;
    function isBlkdev(mode: number): boolean;
    function isFIFO(mode: number): boolean;
    function isSocket(mode: number): boolean;

    //
    // devices
    //
    // each character device consists of a device id + stream operations.
    // when a character device node is created (e.g. /dev/stdin) it is
    // assigned a device id that lets us map back to the actual device.
    // by default, each character device stream (e.g. _stdin) uses chrdev_stream_ops.
    // however, once opened, the stream's operations are overridden with
    // the operations of the device its underlying node maps back to.
    function major(dev: number): number;
    function minor(dev: number): number;
    function makedev(ma: number, mi: number);
    function registerDevice(dev: number, ops: any): void;
    // getDevice(dev: number): Device;

    //
    // core
    //
    function syncfs(populate: boolean, callback: (any) => any): void;
    function mount(type: any, opts: any, mountpoint: string): any;
    function unmount(mountpoint: string): void;
    // function lookup(parent: FSNode, name: string): Lookup;

    function mkdir(path: string, mode: number): any;
    function mkdev(path: string, mode: number, dev: number): any;
    function symlink(oldpath: string, newpath: string): any;
    function rename(old_path: string, new_path: string): void;
    function rmdir(path: string): void;
    function readdir(path: string): any;
    function unlink(path: string): void;
    function readlink(path: string): string;
    function stat(path: string, dontFollow?: boolean): any;
    function lstat(path: string): any;
    function chmod(path: string, mode: number, dontFollow?: boolean): void;
    function lchmod(path: string, mode: number): void;
    function fchmod(fd: number, mode: number): void;
    function chown(path: string, uid: number, gid: number, dontFollow?: boolean): void;
    function lchown(path: string, uid: number, gid: number): void;
    function fchown(fd: number, uid: number, gid: number): void;
    function truncate(path: string, len: number): void;
    function ftruncate(fd: number, len: number): void;
    function utime(path: string, atime: number, mtime: number): void;
    function open(path: string, flags: string, mode?: number, fd_start?: number, fd_end?: number): FSStream;
    function close(stream: FSStream): void;
    function llseek(stream: FSStream, offset: number, whence: number): any;
    function read(stream: FSStream, buffer: ArrayBufferView, offset: number, length: number, position?: number): number;
    function write(stream: FSStream, buffer: ArrayBufferView, offset: number, length: number, position?: number, canOwn?: boolean): number;
    function allocate(stream: FSStream, offset: number, length: number): void;
    function mmap(stream: FSStream, buffer: ArrayBufferView, offset: number, length: number, position: number, prot: number, flags: number): any;
    function ioctl(stream: FSStream, cmd: any, arg: any): any;
    function readFile(path: string, opts?: {encoding: string; flags: string}): any; //string | Uint8Array
    function writeFile(path: string, data: ArrayBufferView, opts?: {encoding: string; flags: string}): void;

    //
    // module-level FS code
    //
    function cwd(): string;
    function chdir(path: string): void;
    function init(input: () => number, output: (number) => any, error: (number) => any): void;

    function createLazyFile(parent: string, name: string, url: string, canRead: boolean, canWrite: boolean): FSNode;
    function createLazyFile(parent: FSNode, name: string, url: string, canRead: boolean, canWrite: boolean): FSNode;

    function createPreloadedFile(parent: string, name: string, url: string, canRead: boolean, canWrite: boolean, onload?: ()=> void, onerror?: ()=>void, dontCreateFile?:boolean, canOwn?: boolean): void;
    function createPreloadedFile(parent: FSNode, name: string, url: string, canRead: boolean, canWrite: boolean, onload?: ()=> void, onerror?: ()=>void, dontCreateFile?:boolean, canOwn?: boolean): void;
}

interface Math {
    imul(a: number, b: number): number;
}

declare var Module: Module;
