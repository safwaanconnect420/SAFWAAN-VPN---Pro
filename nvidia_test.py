from openai import OpenAI

client = OpenAI(
  base_url = "https://integrate.api.nvidia.com/v1",
  api_key = "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"
)

completion = client.chat.completions.create(
  model="nvidia/nemotron-3-ultra-550b-a55b",
  messages=[{"role":"user","content":"What is AI?"}],
  temperature=1,
  top_p=0.95,
  max_tokens=1024,
  stream=True
)

for chunk in completion:
  if not chunk.choices:
    continue

  # Handle reasoning content
  reasoning = getattr(chunk.choices[0].delta, "reasoning_content", None)
  if reasoning:
    print(f"[REASONING] {reasoning}", end="")

  # Handle regular content
  if chunk.choices[0].delta.content is not None:
    print(chunk.choices[0].delta.content, end="")

print("\n\n✓ Done!")
