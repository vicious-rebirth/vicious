#----------------------------------------------------------------------------------
# Project
#----------------------------------------------------------------------------------

cmake_minimum_required(VERSION 3.10..4.2)
project(ViciousSound)

#----------------------------------------------------------------------------------
# Options
#----------------------------------------------------------------------------------

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

#----------------------------------------------------------------------------------
# Dependencies
#----------------------------------------------------------------------------------

add_subdirectory(node_modules/@repo/c)

#----------------------------------------------------------------------------------
# Executables
#----------------------------------------------------------------------------------

add_executable(mus2wav
    src/mus2wav.c
)

add_executable(wav2mus
    src/wav2mus.c
)

add_executable(snd2wav
    src/snd2wav.c
)

target_link_libraries(snd2wav
    vicious
)

add_executable(wav2snd
    src/wav2snd.c
)

target_link_libraries(wav2snd
    vicious
)

add_executable(wav2xbox
    src/wav2xbox.c
)
