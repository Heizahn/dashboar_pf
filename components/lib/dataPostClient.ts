export async function fetchPostBook(book: FormData, token: string) {
	try {
		const res = await fetch(`/api/uploadbook`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(book),
		});

		if (res.ok) {
			console.log('Book created successfully');
			return res.ok;
		}
	} catch (error) {
		console.log('Error creating book');
		if (error instanceof Error) {
			console.log('Error', error.message);
		}
	}
}
