export class ParseHelper {

    public toString(value: any): string {

        if (value) {
            return value.toString();
        }

        return value;

    }

    public toNumber(value: any): number {
        return Number(value);
    }

    public toFloat(value: any, fractionDigits?: number): number {

        if (fractionDigits) {

            value = this.toNumber(value).toFixed(fractionDigits);
            return parseFloat(value);

        } else {
            return parseFloat(value);
        }

    }

    public toArray(value: string, split: string): Array<string> {
        return value.split(split);
    }

    public toAtob(value: string): string {
        return window.atob(value);
    }

    public toBtoa(value: string): string {
        return window.btoa(value);
    }

    public toJSON(value: string): any {
        return JSON.parse(value);
    }

    public toStringify(value: any): string {
        return JSON.stringify(value);
    }

    public toFile(blob: Blob): Promise<any> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => resolve({ data: reader.result, size: blob.size });
            reader.onerror = error => reject(error);
        });
    }

    public toBase64(file: File): Promise<any> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve({ data: reader.result, fileName: file.name });
            reader.onerror = error => reject(error);
        });
    }



}
