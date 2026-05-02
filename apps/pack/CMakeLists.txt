#----------------------------------------------------------------------------------
# Project
#----------------------------------------------------------------------------------

cmake_minimum_required(VERSION 3.10..4.2)
project(ViciousPack)

#----------------------------------------------------------------------------------
# Options
#----------------------------------------------------------------------------------

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/exe")

set(CMAKE_C_STANDARD 99)

#----------------------------------------------------------------------------------
# Dependencies
#----------------------------------------------------------------------------------

add_subdirectory(node_modules/@repo/c)

#----------------------------------------------------------------------------------
# Executables
#----------------------------------------------------------------------------------

add_executable(pack
    src/pack.c
)

target_link_libraries(pack
    vicious
)

if(EMSCRIPTEN)
    set_target_properties(pack PROPERTIES
        SUFFIX ".html"
    )

    target_link_options(pack PRIVATE
        "--shell-file=${CMAKE_SOURCE_DIR}/src/pack.html"
        -sALLOW_MEMORY_GROWTH
        -sEXPORTED_RUNTIME_METHODS=["FS"]
        -sMODULARIZE
    )
endif()

add_executable(unpack
    src/unpack.c
)

target_link_libraries(unpack
    vicious
)

if(EMSCRIPTEN)
    set_target_properties(unpack PROPERTIES
        SUFFIX ".html"
    )

    target_link_options(unpack PRIVATE
        "--shell-file=${CMAKE_SOURCE_DIR}/src/unpack.html"
        -sALLOW_MEMORY_GROWTH
        -sEXPORTED_RUNTIME_METHODS=["FS"]
        -sMODULARIZE
    )
endif()
