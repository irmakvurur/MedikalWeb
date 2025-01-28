declare global {
    var _mongoClientPromise: Promise<any>;
}

// Bu dosya bir modül olduğu için, TypeScript'in diğer dosyalara etki etmesini sağlamak amacıyla şunu ekliyoruz
export {};
