#----------------------------------------------------------------------------------
# Project
#----------------------------------------------------------------------------------

cmake_minimum_required(VERSION 3.10..4.2)
project(ViciousMesh)

#----------------------------------------------------------------------------------
# Options
#----------------------------------------------------------------------------------

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/exe")

set(CMAKE_C_STANDARD 99)

#---------------------------------------------------------------------------------
# Dependencies
#----------------------------------------------------------------------------------

include(FetchContent)

FetchContent_Declare(
    cgltf
    GIT_REPOSITORY https://github.com/jkuhlmann/cgltf.git
    GIT_TAG v1.15
)
FetchContent_MakeAvailable(cgltf)

add_subdirectory(node_modules/@repo/c)

#----------------------------------------------------------------------------------
# Executables
#----------------------------------------------------------------------------------

add_executable(ms2gltf
    src/ms2gltf.c
)

target_include_directories(ms2gltf PUBLIC
    ${cgltf_SOURCE_DIR}
)

target_link_libraries(ms2gltf
    vicious
)

add_executable(mtl2gltf
    src/mtl2gltf.c
)

target_include_directories(mtl2gltf PUBLIC
    ${cgltf_SOURCE_DIR}
)

target_link_libraries(mtl2gltf
    vicious
)
