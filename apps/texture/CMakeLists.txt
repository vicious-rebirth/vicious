#----------------------------------------------------------------------------------
# Project
#----------------------------------------------------------------------------------

cmake_minimum_required(VERSION 3.10..4.2)
project(ViciousTexture)

#----------------------------------------------------------------------------------
# Options
#----------------------------------------------------------------------------------

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/exe")

set(CMAKE_C_STANDARD 99)

#----------------------------------------------------------------------------------
# Dependencies
#----------------------------------------------------------------------------------

include(FetchContent)

FetchContent_Declare(
    stb
    GIT_REPOSITORY https://github.com/nothings/stb.git
    GIT_TAG master
)
FetchContent_MakeAvailable(stb)

add_subdirectory(node_modules/@repo/c)

#----------------------------------------------------------------------------------
# Executables
#----------------------------------------------------------------------------------

add_executable(txr2dds
    src/txr2dds.c
)

target_link_libraries(txr2dds
    vicious
)

add_executable(dds2txr
    src/dds2txr.c
)

target_link_libraries(dds2txr
    vicious
)

add_executable(txr2png
    src/txr2png.c
)

target_include_directories(txr2png PUBLIC
    ${stb_SOURCE_DIR}
)

target_link_libraries(txr2png
    vicious
)
