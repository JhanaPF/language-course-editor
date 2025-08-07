function readFormData(formData: FormData): Record<string, FormDataEntryValue> {
    const data: Record<string, FormDataEntryValue> = {};

    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

    console.log('form data =', data);
    return data;
}

export { readFormData };