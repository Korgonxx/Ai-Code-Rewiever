import React, { useState } from 'react'

export default function App() {
	const [code, setCode] = useState('')
	const [response, setResponse] = useState('')
	const [loading, setLoading] = useState(false)

	async function submit() {
		setLoading(true)
		setResponse('')
		try {
			const res = await fetch('http://localhost:3000/ai/get-review', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ code })
			})
			const text = await res.text()
			setResponse(text)
		} catch (err) {
			setResponse('Request failed: ' + err.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div style={{ padding: 24, fontFamily: 'Arial, sans-serif' }}>
			<h1>AI Code Reviewer</h1>
			<textarea
				placeholder="Paste code to review"
				value={code}
				onChange={e => setCode(e.target.value)}
				style={{ width: '100%', height: 200, fontFamily: 'monospace' }}
			/>
			<div style={{ marginTop: 8 }}>
				<button onClick={submit} disabled={loading || !code}>
					{loading ? 'Reviewing…' : 'Get Review'}
				</button>
			</div>
			<pre style={{ whiteSpace: 'pre-wrap', background: '#f6f8fa', padding: 12, marginTop: 12 }}>{response}</pre>
		</div>
	)
}
