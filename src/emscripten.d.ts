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
    intArrayFromString(stringy: string, dontAddNull: boolean, length?: number): number[];
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

interface Math {
    imul(a: number, b: number): number;
}

declare var Module: Module;
