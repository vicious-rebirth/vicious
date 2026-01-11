# Audio

Tooling to convert proprietary files (`.mus` and `.snd`) to a more modern/free format (`.wav`).

## Tools

### mus2wav

Converts a music track (`.mus`) to ADPCM WAV (`.wav`).

#### Usage

```
mus2wav mus_file [wav_file]
```

- mus_file: Input path to `.mus` file
- (Optional) wav_file: Output path to `.wav` file (defaults to `out.wav`)

### snd2wav

Converts a sound effect (`.snd`) to ADPCM WAV (`.wav`).

#### Usage

```
snd2wav snd_file [wav_file]
```

- snd_file: Input path to `.snd` file
- (Optional) wav_file: Output path to `.wav` file (defaults to `out.wav`)

### wav2mus

Converts an Xbox ADPCM WAV (`.wav`) to a music track (`.mus`).

Note: The WAV format is very specific, use `wav2xbox` to fix your file.

#### Usage

```
wav2mus wav_file [mus_file]
```

- wav_file: Input path to `.wav` file
- (Optional) mus_file: Output path to `.mus` file (defaults to `out.mus`)

### wav2snd

Injects an Xbox ADPCM WAV (`.wav`) into a sound effect (`.snd`).

Note: The WAV format is very specific, use `wav2xbox` to fix your file.

#### Usage

```
wav2snd wav_file in_snd_file [out_snd_file]
```

- wav_file: Input path to `.wav` file
- in_snd_file: Input path to reference `.snd` file
- (Optional) out_snd_file: Output path to `.snd` file (defaults to `out.snd`)

### wav2xbox

Converts an IMA ADPCM WAV (`.wav`) to an Xbox ADPCM WAV (`.wav`).

See FAQ for how to export to IMA ADPCM.

#### Usage

```
wav2xbox in_wav_file [out_wav_file]
```

- in_wav_file: Input path to IMA ADPCM `.wav` file
- out_wav_file: Output path to Xbox ADPCM `.wav` file (defaults to `out.wav`)

## FAQ

### How do I export to ADPCM WAV?

[Audacity](https://www.audacityteam.org/) lets you input/output in IMA ADPCM, which is similar enough to Xbox's format (see [this wiki page](https://xboxdevwiki.net/Xbox_ADPCM)). Using `Export Audio`, select:

- Format: WAV
- Channels: Mono
- Sample Rate: 44100 Hz
- Encoding: IMA ADPCM

With this WAV file, pass it through `wav2xbox` and it should work!
